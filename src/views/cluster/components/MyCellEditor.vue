<template>
  <div class="panel">
    <div class="panel-heading tabs is-toggle is-toggle-rounded">
      <ul>
        <li :class="normal_active">
          <a @click="changeView(viewMode.normal)"><span>Normal</span></a>
        </li>
        <li :class="range_active">
          <a @click="changeView(viewMode.range)"><span>Range</span></a>
        </li>
      </ul>
    </div>
    <div v-if="currentView === viewMode.normal" class="panel-block">
      <div class="control">
        <div class="level">
          <div class="control level-item">
            <input
              ref="input"
              v-model.number="value"
              class="input is-primary"
              type="text"
              @keydown.enter="onChange($event)"
            />
          </div>
          <div class="control level-item">
            <button class="button level-item" @click="changeData">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentView === viewMode.range">
      <div class="panel-block">
        <div class="level">
          <div class="level-left">
            <span class="tag is-info is-small">Range:{{ getRange }}</span>
          </div>
          <div class="level-item">
            <span class="tag is-info is-small">Current Value: {{ value }}</span>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="control">
          <div class="level">
            <div class="level-item">
              <span class="tag is-info is-small">K</span>
            </div>
            <div class="control level-item">
              <input
                v-model.number="k_value"
                class="input range-input is-small"
                type="number"
                min="0"
                @keydown.enter="onKvalueChange($event)"
              />
            </div>
            <div class="level-item">
              <span class="tag is-info is-small">Step</span>
            </div>
            <div class="control level-item">
              <input
                v-model.number="c_value"
                class="input range-input is-small"
                type="number"
                min="1"
                @keydown.enter="onCvalueChange($event)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="control">
          <div class="level">
            <div class="control level-item">
              <input
                v-model.number="sliderValue"
                class="slider is-success is-circle is-fullwidth"
                step="1"
                min="0"
                :max="sliderMax"
                type="range"
                @change="highlightLinePoint"
              />
            </div>

            <div class="control level-item">
              <button class="button level-item is-small" @click="changeData">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
        name: 'MyCellEditor',
        data() {
            return {
                value: 0,
                cancelBeforeStart: true,
                changed: false,
                k_value: 1,
                c_value: 1,
                std_deviation: 1,
                slider_value: 0,
                current_data_variety: { current_node_id: 0, data: [] },
                currentView: 0,
                viewMode: {
                    normal: 0,
                    range: 1
                },
                normal_active: 'is-active',
                range_active: '',
                sliderMax: 1,
                sliderValue: 1

            }
        },
        computed: {
            ...mapGetters('table', {
                getStds: 'getStds'
            }),
            getMin: function() {
                return this.params.value - this.k_value * this.std_deviation
            },
            getMax: function() {
                return this.params.value + this.k_value * this.std_deviation
            },
            getRange: function() {
                return '[' + this.getMin + ', ' + this.getMax + ']'
            }

        },
        created() {
            this.value = this.params.value

            // only start edit if key pressed is a number, not a letter
            this.cancelBeforeStart = this.params.charPress && ('1234567890'.indexOf(this.params.charPress) < 0)
            this.getStd({ colId: this.params.column.colId })
        },
        mounted() {
            Vue.nextTick(() => {
                // need to check if the input reference is still valid - if the edit was cancelled before it started there
                // wont be an editor component anymore
                if (this.$refs.input) {
                    this.$refs.input.focus()
                }
            })
            this.clearScatterLinePoint()
            this.current_data_variety.current_node_id = this.params.node.data.rowIndex
            this.current_data_variety.data.push(this.params.node.data)
            this.addScatterLinePoints(this.current_data_variety)
        },

        methods: {
            ...mapMutations('scatter', {
                updateScatterGraphicPointByData: 'updateScatterGraphicPointByData',
                addScatterLinePointByIndex: 'addScatterLinePointByIndex',
                addScatterLinePointByData: 'addScatterLinePointByData',
                clearScatterLinePoint: 'clearScatterLinePoint',
                highlightLinePointByIndex: 'highlightLinePointByIndex'
            }),
            ...mapActions('scatter', {
                addScatterLinePoints: 'addScatterLinePoints'
            }),
            ...mapActions('table', {
                getStd: 'getStd'
            }),
            changeView(mode) {
                this.clearScatterLinePoint()
                this.current_data_variety.data = []
                console.log('数据')
                console.log(this.params)
                const rowIndex = this.params.node.data.rowIndex
                this.current_data_variety.current_node_id = rowIndex
                this.current_data_variety.data.push(this.params.node.data)
                this.addScatterLinePoints(this.current_data_variety)
                this.currentView = parseInt(mode)
                switch (this.currentView) {
                    case this.viewMode.range:
                        this.range_active = 'is-active'
                        this.normal_active = ''
                        break
                    case this.viewMode.normal:
                        this.normal_active = 'is-active'
                        this.range_active = ''
                        break
                }
            },
            getValue() {
                this.clearScatterLinePoint()
                return this.changed ? this.value : this.params.value
            },
            isPopup() {
                return true
            },
            isCancelBeforeStart() {
                return this.cancelBeforeStart
            },

            // will reject the number if it greater than 1,000,000
            // not very practical, but demonstrates the method.
            isCancelAfterEnd() {
                return this.value > 1000000
            },

            onKeyDown(event) {
                // if (!this.isKeyPressedNumeric(event)) {
                //     if (event.preventDefault) event.preventDefault();
                // }
            },

            getCharCodeFromEvent(event) {
                event = event || window.event
                return (typeof event.which === 'undefined') ? event.keyCode : event.which
            },

            isCharNumeric(charStr) {
                return /\d/.test(charStr)
            },

            isKeyPressedNumeric(event) {
                const charCode = this.getCharCodeFromEvent(event)
                const charStr = String.fromCharCode(charCode)
                return this.isCharNumeric(charStr)
            },
            onChange(event) {
                event.stopImmediatePropagation()
                this.current_data_variety.data = []
                this.current_data_variety.current_node_id = this.params.node.data.rowIndex
                this.current_data_variety.data.push(this.params.node.data)
                const dataObj = JSON.parse(JSON.stringify(this.params.node.data))
                dataObj[this.params.column.colId] = this.value
                // let dataArray = Object.keys(dataObj).map(key => dataObj[key]);
                // this.addScatterLinePointByData(dataArray);
                this.current_data_variety.data.push(dataObj)
                this.addScatterLinePoints(this.current_data_variety)
                // console.log(this.params.rowIndex);
                // this.addScatterLinePointByIndex(this.params.rowIndex);
            },
            changeData() {
                console.log('前向投影')
                this.changed = true
                this.params.api.stopEditing()
            },
            onKvalueChange(event) {
                event.stopImmediatePropagation()
                this.generatePointsInInterval()
            },
            onCvalueChange(event) {
                event.stopImmediatePropagation()
                this.generatePointsInInterval()
            },
            generatePointsInInterval() {
                this.clearScatterLinePoint()
                this.current_data_variety.data = []
                // // left interval
              for (let i = this.params.value; i >= this.getMin; i -= this.c_value * this.std_deviation) {
                    const dataObj = JSON.parse(JSON.stringify(this.params.node.data))
                    dataObj[this.params.column.colId] = i
                    this.current_data_variety.data.push(dataObj)
                }
                this.current_data_variety.data.reverse()

                this.sliderValue = this.current_data_variety.data.length - 1
                // right interval
              for (let i = this.params.value + this.c_value; i <= this.getMax; i += this.c_value * this.std_deviation) {
                    const dataObj = JSON.parse(JSON.stringify(this.params.node.data))
                    dataObj[this.params.column.colId] = i
                    this.current_data_variety.data.push(dataObj)
                }
                this.sliderMax = this.current_data_variety.data.length - 1
                this.addScatterLinePoints(this.current_data_variety)
                this.highlightLinePointByIndex(this.sliderValue)
            },
            highlightLinePoint() {
                this.value = this.current_data_variety.data[this.sliderValue][this.params.column.colId]
                this.highlightLinePointByIndex(this.sliderValue)
            }
        },
        watch: {
            getStds: {
                handler(nval, oval) {
                    this.std_deviation = nval[this.params.column.colId]
                },
                deep: true
            }
        }
    }
</script>

