<template>
    <div class="onemap-page">
        <Mapview />
        <MapTools />
        <MapTree />
        <XZQHQuery />
        <ResultTable />
    </div>
</template>

<script>
import Mapview from './../components/common/Mapview';
import MapTools from './../components/MapTools';
import MapTree from './../components/MapTree';
import XZQHQuery from './../components/XZQHQuery';
import ResultTable from './../components/ResultTable';

export default {
    name: 'OneMap',
    components: {
        Mapview,
        MapTools,
        MapTree,
        XZQHQuery,
        ResultTable,
    },
    methods: {},
};
</script>
<style>
.onemap-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>;
