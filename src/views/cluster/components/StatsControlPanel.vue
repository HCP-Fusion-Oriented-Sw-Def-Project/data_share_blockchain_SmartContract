<template>
  <div class="control-panel">
    <div class="level">
      <div class="level-left">
        <div class="level">
          <div class="level-left">
            <div class="select is-rounded is-small">
              <label>
                <select v-model="stats_selected">
                  <!--                  <option :value="anova">ANOVA</option>-->
                  <option :value="corrcoef">Corrcoef</option>
                </select>
              </label>
            </div>
          </div>
          <div class="level-right">
            <button class="button is-rounded is-small" @click="startStats">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'StatsControlPanel',
        props: ['mode'],
        data() {
            return {
                stats_selected: 1,
                anova: 0,
                corrcoef: 1
            }
        },
        methods: {
            ...mapActions('heatmap', {
                getDataAndAnova: 'getDataAndAnova'
            }),
            ...mapActions('corrcoef', {
                getCorrcoef: 'getCorrcoef'
            }),
            startStats() {
                switch (this.stats_selected) {
                    case this.anova:
                        this.getDataAndAnova()
                        this.$emit('displayStatsView', this.mode.anova)
                        break
                    case this.corrcoef:
                        this.getCorrcoef()
                        this.$emit('displayStatsView', this.mode.corrcoef)
                        break
                }
            }
        }
    }
</script>

<style scoped>
    .control-panel {
        height: 50px;
    }
</style>
