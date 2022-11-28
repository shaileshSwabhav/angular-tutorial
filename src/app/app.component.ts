import { AfterViewInit, Component } from '@angular/core';
import { Chart, Tooltip } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'tutorial';

  barChart!: Chart

  constructor(
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createBarChart()
    }, 500)
  }

  createBarChart(): void {

    this.barChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
        animation: {
          duration: 100,
          onComplete(event) {
            var chartInstance = event.chart
            var ctx = chartInstance.ctx;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            console.log(chartInstance);

            this.data.datasets.forEach(function (dataset, i) {
              console.log("dataset -> ", dataset);

              var meta = chartInstance.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data: any = dataset.data[index];
                ctx.fillStyle = "#CFF5E7"
                ctx.textAlign = "center";
                ctx.fillText(data?.toString(), bar.x, bar.y - 5);
              });
            });
          },
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    })


    // Chart.register({
    //   id: 'barChart',
    //   // beforeRender(chart, _args, options) {
    //   //   console.log("before render chart -> ", chart);
    //   //   console.log("before render options -> ", options);
    //   // },
    //   afterDraw(chart, _args, _options) {
    //     console.log("after draw chart -> ", chart);
    //     chart.tooltip!.active = true
    //   },
    // })
  }

}
