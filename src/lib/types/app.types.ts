export type CategoryCtx = {
	categories:
		| {
				id: number;
				name: string;
				parent_id: number | null;
		  }[]
		| null;
};
