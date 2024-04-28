import { toRefs, reactive, computed } from "vue";

export function useTable() {
    const state = reactive({
        page: 1,
        itemPerPage: 10,
        search: "",
        selectedList: [],
    }); // state

    const selectedListIds = computed(() => {
        if (!state.selectedList) {
            return [];
        }
        return state.selectedList.map((item) => item.id);
    });

    const onPageChange = (event) => {
        state.page = event.page + 1;
        state.itemPerPage = event.rows;
    };

    const onSearchChange = (value) => {
        state.search = value;
    };

    return {
        onPageChange,
        onSearchChange,
        selectedListIds,
        state: toRefs(state),
    };
}
