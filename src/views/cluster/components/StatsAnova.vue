<template>
  <div>
    <div>
      <span class="tag is-info is-small">anova on feature:  <b>{{ getAnovaResult.feature }}</b></span>
    </div>
    <table class="table anova">
      <tbody>
        <tr v-for="row in getAnovaResult.body">
          <td v-for="column in row">
            {{ column }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'StatsAnova',
        computed: {
            ...mapGetters('anova', {
                getAnovaResult: 'getAnovaResult'
            })
        }
    }
</script>

<style scoped>
    .anova {
        width: 100%;
    }
</style>
