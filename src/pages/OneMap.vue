<template>
    <div class="onemap-page">
        <Mapview />
        <MapTools />
        <MapTree />
        <MultiScreens />
        <XZQHQuery />
    </div>
</template>

<script>
import Mapview from './../components/common/Mapview';
import MapTools from './../components/MapTools';
import MapTree from './../components/MapTree';
import MultiScreens from './../components/MultiScreens';
import XZQHQuery from './../components/XZQHQuery';

export default {
    name: 'OneMap',
    components: {
        Mapview,
        MapTools,
        MapTree,
        MultiScreens,
        XZQHQuery,
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
