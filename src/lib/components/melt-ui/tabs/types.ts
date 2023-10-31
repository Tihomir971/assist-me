import type { CreateTabsProps, TabsTriggerProps } from '@melt-ui/svelte';
import type { AsChild, HTMLDivAttributes, OmitValue, OnChangeFn } from '../types';
import type { CustomEventHandler } from '$lib/helpers';
import type { ObjectVariation } from '$lib/internal';
import type { HTMLButtonAttributes } from 'svelte/elements';

type Props = Expand<
	OmitValue<CreateTabsProps> & {
		orientation?: CreateTabsProps['orientation'] & unknown;
		value?: CreateTabsProps['defaultValue'] & unknown;
		onValueChange?: OnChangeFn<CreateTabsProps['defaultValue']>;
	} & AsChild
> &
	HTMLDivAttributes;

type ContentProps = Expand<
	{
		value: string;
	} & AsChild
> &
	HTMLDivAttributes;

type TriggerProps = Expand<ObjectVariation<TabsTriggerProps> & AsChild> & HTMLButtonAttributes;

type ListProps = AsChild & HTMLDivAttributes;

type TriggerEvents<T extends Element = HTMLButtonElement> = {
	click: CustomEventHandler<MouseEvent, T>;
	keydown: CustomEventHandler<KeyboardEvent, T>;
	focus: CustomEventHandler<FocusEvent, T>;
};
export type {
	Props,
	ContentProps,
	TriggerProps,
	ListProps,
	//
	/* Props as TabsProps, */
	ContentProps as TabsContentProps,
	TriggerProps as TabsTriggerProps,
	/* ListProps as TabsListProps, */
	//
	TriggerEvents,
	//
	TriggerEvents as TabsTriggerEvents
};
