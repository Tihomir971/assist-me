<script lang="ts">
    import { melt } from '@melt-ui/svelte';
    export let list
</script>

<div
use:melt={$list}
class="flex shrink-0 overflow-x-auto bg-gray-1
data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r"
aria-label="Manage your account"
>
<slot></slot>
</div>