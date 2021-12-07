<template>
    <div class="sceneview-page">
        <Sceneview />
    </div>
</template>

<script>
import Sceneview from './../components/common/Sceneview';

export default {
    name: 'SceneMap',
    components: {
        Sceneview,
    },
    methods: {},
};
</script>
<style>
.sceneview-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>;
