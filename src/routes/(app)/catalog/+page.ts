import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Tables } from '$lib/types/database.types';
type Product = Partial<Tables<'m_product'>> & {
	id: number;
	qtyonhand: number;
	pricePurchase: number;
	priceMarket: number;
	priceRetail: number;
	priceRecommended: number;
	taxRate: number;
	m_storageonhand: { qtyonhand: number }[];
};

export const load = (async ({ parent, depends, url }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	//Get searchParams
	const paramsOnStock = url.searchParams.get('onStock');
	const paramsWarehouse = url.searchParams.get('wh');
	if (!paramsOnStock || !paramsWarehouse) {
		const newUrl = new URL(url);
		newUrl?.searchParams?.set('onStock', paramsOnStock ?? 'true');
		newUrl?.searchParams?.set('wh', paramsWarehouse ?? '5');
		throw redirect(303, newUrl);
	}

	const activeWarehouseId = Number(paramsWarehouse);
	const onStock = paramsOnStock === 'true' ? true : false;

	/* const activeWarehouseId = url.searchParams.get('wh') ? Number(url.searchParams.get('wh')) : null; */

	const activeCategoryId = url.searchParams.get('cat') ? Number(url.searchParams.get('cat')) : null;

	const columns =
		'id,barcode,mpn,sku,name,c_taxcategory_id,c_uom_id,m_storageonhand(qtyonhand),qPriceRetail:m_productprice(pricestd),qPricePurchase:m_productprice(pricestd),qPriceMarket:m_productprice(pricelist),c_taxcategory(c_tax(rate)),isactive,isselfservice,discontinued';

	let query = supabase
		.from('m_product')
		.select(columns)
		.order('name', { ascending: true })
		.eq('producttype', 'I')
		.eq('m_storageonhand.warehouse_id', activeWarehouseId)
		.eq('qPriceRetail.m_pricelist_version_id', 13)
		.eq('qPricePurchase.m_pricelist_version_id', 5)
		.eq('qPriceMarket.m_pricelist_version_id', 15);
	query =
		typeof activeCategoryId === 'number'
			? query.eq('m_product_category_id', activeCategoryId)
			: query.is('m_product_category_id', null);

	const { data } = await query;

	const products: Product[] = [];
	data?.forEach((product) => {
		console.log('data.mpn', product?.mpn);
		// Assign quantity  for product if exist
		let qtyonhand = 0;
		if (Array.isArray(product.m_storageonhand) && product.m_storageonhand?.length !== 0) {
			({ qtyonhand } = product.m_storageonhand[0]);
		}

		if (onStock === true && qtyonhand === 0) {
			return;
		}

		const taxRate = product.c_taxcategory_id === 2 ? 0.1 : 0.2;

		// Assign retail price for product if exist
		let priceRetail = 0;
		if (Array.isArray(product.qPriceRetail) && product.qPriceRetail?.length !== 0) {
			const { pricestd } = product.qPriceRetail[0];
			priceRetail = pricestd ?? 0;
		}

		// Assign retail price for product if exist
		let priceMarket = 0;
		if (Array.isArray(product.qPriceMarket) && product.qPriceMarket?.length !== 0) {
			const { pricelist } = product.qPriceMarket[0];
			if (pricelist) {
				priceMarket = pricelist;
			}
		}

		// Assign quantity  for product if exist
		let pricePurchase = 0;
		if (Array.isArray(product.qPricePurchase) && product.qPricePurchase?.length !== 0) {
			const { pricestd } = product.qPricePurchase[0];
			pricePurchase = pricestd ? pricestd * (1 + taxRate) : 0;
		}

		let priceRecommended = 0;
		if (priceMarket === 0) {
			priceRecommended = pricePurchase * 1.3;
		} else if (priceMarket < pricePurchase) {
			priceRecommended = pricePurchase;
		} else if (priceMarket < pricePurchase * 1.3) {
			priceRecommended = priceMarket;
		} else {
			priceRecommended = pricePurchase * 1.3;
		}

		priceRecommended = Math.ceil(priceRecommended);
		if (priceRecommended < 2000) {
			priceRecommended = priceRecommended - 0.01;
		}

		products.push({
			id: product.id,
			barcode: product.barcode,
			sku: product.sku,
			name: product.name,
			qtyonhand: qtyonhand,
			priceRetail: priceRetail,
			pricePurchase: pricePurchase,
			priceMarket: priceMarket,
			priceRecommended: priceRecommended,
			mpn: product.mpn,
			taxRate: taxRate,
			isactive: product.isactive,
			isselfservice: product.isselfservice,
			discontinued: product.discontinued,
			m_storageonhand: product.m_storageonhand
		});
	});

	depends('catalog:products');
	return { products };
}) satisfies PageLoad;
