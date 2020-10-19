<template>
  <Echarts :id="idv" :options="getCorrcoefOptions" />
</template>

<script>
    import { mapGetters } from 'vuex'
    import Echarts from './Echarts'

    export default {
        name: 'StatsCorrcoef',
        computed: {
            ...mapGetters('corrcoef', {
                getCorrcoefOptions: 'getCorrcoefOptions'
            })
        },
        components: { Echarts },
        data() {
            return {
                idv: 'corrcoef_view'
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
