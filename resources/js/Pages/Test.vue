<script>
import AppLayout from "@/Layouts/AppLayout/Index.vue";
export default {
    layout: AppLayout,
};
</script>

<script setup>
import { Head } from "@inertiajs/vue3";
import { useTable } from "@/Composables/useTable";

const { state, selectedListIds, onPageChange, onSearchChange } = useTable();
</script>

<template>
    <Head title="Test" />
    <h3>Test</h3>
</template>
