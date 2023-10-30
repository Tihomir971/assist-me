import type { CreateTabsProps, TabsTriggerProps } from "@melt-ui/svelte";
import type { AsChild, HTMLDivAttributes, OmitValue, OnChangeFn } from "../types";

type Props = Expand<
	OmitValue<CreateTabsProps> & {
		orientation?: CreateTabsProps["orientation"] & {};
		value?: CreateTabsProps["defaultValue"] & {};
		onValueChange?: OnChangeFn<CreateTabsProps["defaultValue"]>;
	} & AsChild
> &
	HTMLDivAttributes;

    export type {
        Props,
        /* ContentProps, */
        /* TriggerProps, */
        /* ListProps, */
        //
        /* Props as TabsProps, */
        /* ContentProps as TabsContentProps, */
        /* TriggerProps as TabsTriggerProps, */
        /* ListProps as TabsListProps, */
        //
        /* TriggerEvents, */
        //
        /* TriggerEvents as TabsTriggerEvents */
    };