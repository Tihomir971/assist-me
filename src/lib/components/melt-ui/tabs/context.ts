import { setContext, getContext } from 'svelte'
import { createTabs,  } from '@melt-ui/svelte'
import type { CreateTabsProps, Tabs } from '@melt-ui/svelte'
import { getOptionUpdater } from '../updater';
import { removeUndefined } from '../object';

const NAME = "tabs";
type GetReturn = Tabs ;


export function setCtx(props: CreateTabsProps) {
	const tabs = createTabs(removeUndefined(props));
	setContext(NAME, tabs);
	return {
		...tabs,
		updateOption: getOptionUpdater(tabs.options)
	};
}

export function getCtx() {
	return getContext<GetReturn>(NAME);
}