<script>
import { mapActions } from "vuex";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default {
  name: "Dashboard_Users_Latest",
  data() {
    return {
      loading: true,
      items: [],
      root: null, // برای مدیریت ریشه amcharts
    };
  },
  mounted() {
    this.Get_Items();
  },
  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  },

  methods: {
    ...mapActions(["Module_Dashboard_Leads_Status"]),
    Get_Items() {
      this.Module_Dashboard_Leads_Status().then((res) => {
            res.data.result.forEach((item) => {
              this.items.push({
                country: item.name,
                value: item.leads_count,
              });
            });
            this.renderChart();
            this.loading = false;
          })
          .catch(() => {
            this.Methods_Notify_Error_Server();
          });
    },

    renderChart() {
      if (this.root) {
        this.root.dispose(); // اگر نمودار قبلاً وجود دارد، حذف شود.
      }

      let root = am5.Root.new(this.$refs.chartdiv);

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft:0,
        paddingRight:1
      }));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
        minorGridEnabled: true
      });

      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
      });

      xRenderer.grid.template.setAll({
        location: 1
      })

      let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "country",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      }));

      let yRenderer = am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1
      })

      let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: yRenderer
      }));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "country",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      }));

      series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
      series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });


// Set data
      let data = this.items;

      xAxis.data.setAll(data);
      series.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      chart.appear(1000, 100);
      this.root = root
    },
  },
};
</script>

<template>
  <q-card class="shadow-2">
    <q-card-section class="bg-blue-grey-10 q-pa-sm glossy">
      <q-btn
          icon="fas fa-times"
          color="dark"
          glossy
          round
          size="xs"
          class="float-right"
      ></q-btn>
      <strong class="text-white">نمودار وضعیت سرنخ ها</strong>
    </q-card-section>
    <q-card-section>
      <div dir="ltr" class="chart-class" ref="chartdiv"></div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.chart-class {
  width: 100%;
  height: 500px;
}
</style>
