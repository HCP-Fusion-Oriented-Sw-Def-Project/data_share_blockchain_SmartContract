<template>
  <div class="control-panel">
    <div class="level">
      <div class="level-left">
        <div class="select is-rounded is-small">
          <label>
            <select v-model="cluster_selected">
              <option :value="k_means">K-means</option>
              <option :value="DBScan">DBScan</option>
              <option :value="增量式聚类">增量式聚类</option>
            </select>
          </label>
        </div>
      </div>
      <!-- K-means -->
      <div class="level-item">
        <span class="tag is-info is-small">{{ clusterNum }}</span>
      </div>

      <div class="level-item">
        <input
          v-model.number="clusterNum"
          class="slider is-success is-circle cluster-slider"
          step="1"
          min="1"
          :max="max_clusters"
          type="range"
          @change="cluster"
        />
      </div>

      <div class="level-item">
        <input
          v-model.number="max_clusters"
          class="input is-small is-rounded max-clusters-input"
          min="1"
          placeholder="set max clusters"
          @change="startClustering"
        />
      </div>

      <!-- DBSCAN -->
      <!-- <div class="level-item">
                <span>epsilon </span>
                <input class="input is-small is-rounded max-clusters-input" v-model.number="eps" min="0"
                       @change="startClustering" placeholder="set max clusters">
            </div>
            <div class="level-item">
                <span>minpPoints </span>
                <input class="input is-small is-rounded max-clusters-input" v-model.number="num" min="1"
                       @change="startClustering" placeholder="set max clusters">
            </div> -->

      <div class="level-item">
        <a @click="cluster">
          <span class="icon has-text-success">
            <font-awesome-icon icon="redo" />
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex'

    export default {
        name: 'HotmapControlPanel',
        data() {
            return {
                cluster_selected: 0,
                stats_selected: 0,
                k_means: 0,
                anova: 0,
                max_clusters: 10,
                eps: 0.15,
                num: 5,
                clusterNum: 10
            }
        },
        methods: {
            ...mapActions({
                kmeans_handle: 'kmeans'
            }),
            ...mapActions('heatmap', {
                getDataAndAnova: 'getDataAndAnova'
            }),
            ...mapMutations('heatmap', {
                setClusterNum: 'setClusterNum'
            }),
            startClustering() {
                switch (this.cluster_selected) {
                    case this.k_means:
                        this.kmeans_handle(this.max_clusters)
                        this.clusterNum = this.max_clusters
                        break
                }
            },
            cluster() {
                switch (this.cluster_selected) {
                    case this.k_means:
                        this.kmeans_handle(this.clusterNum)

                        break
                }
            },
            startStats() {
                switch (this.stats_selected) {
                    case this.anova:
                        this.getDataAndAnova()
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

    .max-clusters-input {
        width: 50px;
    }

    .cluster-slider {
        margin: 0 !important;
    }
</style>
