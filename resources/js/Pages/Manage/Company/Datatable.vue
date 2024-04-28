<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Tag from "primevue/tag";
import Paginator from "primevue/paginator";
import Button from "primevue/button";

defineProps({
    companies: Object,
});

defineEmits(["onPageChange", "onSearchChange", "editProduct", "deleteProduct"]);

const searchValue = ref("");
const selectedCompanyList = defineModel("selectedList");

const getBadgeSeverity = (companyStatus) => {
    switch (companyStatus) {
        case "1":
            return "success";
        case "0":
            return "danger";
        default:
            return "info";
    }
};
</script>

<template>
    <DataTable
        :value="companies.data"
        scrollable
        scrollHeight="500px"
        v-model:selection="selectedCompanyList"
    >
        <template #header>
            <div
                class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
                <h5 class="m-0">Manage Companies</h5>
                <form @submit.prevent="$emit('onSearchChange', searchValue)">
                    <IconField iconPosition="left" class="block mt-2 md:mt-0">
                        <InputIcon class="pi pi-search" />
                        <InputText
                            v-model="searchValue"
                            class="w-full sm:w-auto"
                            placeholder="Search name or alias"
                        />
                        <Button
                            class="ml-2"
                            label="Search"
                            icon="pi pi-search"
                            type="submit"
                        />
                    </IconField>
                </form>
            </div>
        </template>

        <template #empty> No companies found. </template>

        <Column selectionMode="multiple" headerStyle="width: 2rem"></Column>
        <Column field="id" header="ID" headerStyle="width:10%; min-width:3rem;">
            <template #body="slotProps">
                <span class="p-column-title">ID</span>
                {{ slotProps.data.id }}
            </template>
        </Column>
        <Column
            field="name"
            header="Name"
            headerStyle="width:40%; min-width:10rem;"
        >
            <template #body="slotProps">
                <span class="p-column-title">Name</span>
                {{ slotProps.data.name }}
            </template>
        </Column>
        <Column
            field="alias"
            header="Alias"
            headerStyle="width:20%; min-width:8rem;"
        >
            <template #body="slotProps">
                <span class="p-column-title">Alias</span>
                {{ slotProps.data.alias }}
            </template>
        </Column>
        <Column
            field="is_active"
            header="Status"
            :sortable="true"
            headerStyle="width:10%; min-width:10rem;"
        >
            <template #body="slotProps">
                <span class="p-column-title">Status</span>
                <Tag :severity="getBadgeSeverity(slotProps.data.is_active)">{{
                    slotProps.data.is_active ? "Active" : "Inactive"
                }}</Tag>
            </template>
        </Column>
        <Column headerStyle="width:20%;min-width:10rem;">
            <template #body="slotProps">
                <Button
                    icon="pi pi-pencil"
                    class="mr-2"
                    severity="success"
                    rounded
                    @click="editProduct(slotProps.data)"
                />
                <Button
                    icon="pi pi-trash"
                    class="mt-2"
                    severity="warning"
                    rounded
                    @click="confirmDeleteProduct(slotProps.data)"
                />
            </template>
        </Column>
    </DataTable>

    <Paginator
        :first="companies.meta.from - 1"
        :rows="companies.meta.per_page"
        :totalRecords="companies.meta.total"
        :rowsPerPageOptions="[10, 20, 30]"
        @page="$emit('onPageChange', $event)"
    />
</template>
