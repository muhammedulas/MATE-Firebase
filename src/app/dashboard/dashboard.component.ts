import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { map } from 'rxjs/operators';
import { personalTaskModel } from '../models/personelTaskModel';
import { teamModel } from '../models/teamModel';
import { userModel } from '../models/userModel';
import { AuthService } from '../services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { MyTeamService } from '../services/my-team.service';
import { UserProfileService } from '../services/user-profile.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ApexAxisChartSeries, ApexDataLabels, ApexPlotOptions, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from 'ng-apexcharts';
import { ViewChild } from '@angular/core';
import { taskModel } from '../models/taskModel';
import { TasksService } from '../services/tasks.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

export type barChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis:ApexYAxis
};

export type radialBarChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

export type pieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public search:string;
  public teamCompDatas = [];
  public teamCompLabels = [];
  public successfulCount: number = 0;
  public unsuccessfulCount: number = 0;
  public cancelledCount: number = 0;
  public completedCount: number = 0;
  public firstChartOptions: Partial<radialBarChartOptions>
  public secondChartOptions: Partial<pieChartOptions>
  public thirdChartOptions: Partial<barChartOptions>
  public teamMembers: userModel[] = [];
  public selectedTodos: boolean = false;
  private taskList: taskModel[] = [];
  public closedList: taskModel[] = [];
  public todos: personalTaskModel[] = [];
  public tempTodo: personalTaskModel = {
    description: "",
    owner: localStorage.getItem('userName'),
    ownerKey: localStorage.getItem('userKey'),
    completed: false,
    taskKey: ""
  }

  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas: any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData: Array<any>;
  public lineBigDashboardChartOptions: any;
  public lineBigDashboardChartLabels: Array<any>;
  public lineBigDashboardChartColors: Array<any>

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType;
  public lineChartData: Array<any>;
  public lineChartOptions: any;
  public lineChartLabels: Array<any>;
  public lineChartColors: Array<any>

  public lineChartWithNumbersAndGridType;
  public lineChartWithNumbersAndGridData: Array<any>;
  public lineChartWithNumbersAndGridOptions: any;
  public lineChartWithNumbersAndGridLabels: Array<any>;
  public lineChartWithNumbersAndGridColors: Array<any>

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData: Array<any>;
  public lineChartGradientsNumbersOptions: any;
  public lineChartGradientsNumbersLabels: Array<any>;
  public lineChartGradientsNumbersColors: Array<any>
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  constructor(private authService: AuthService, private userProfileService: UserProfileService,
    private dashboardService: DashboardService, private router: Router,
    private myTeamService: MyTeamService,
    private shared:SharedService) {

    this.userProfileService.getUserInfo(localStorage.getItem('currentUserUID')).snapshotChanges().pipe(

      map(changes =>

        changes.map(c =>

          ({ key: c.payload.key, ...c.payload.val() })

        )

      )

    ).subscribe(data => {
      var finalData: userModel[] = data
      localStorage.setItem('userKey', finalData[0].key)
      localStorage.setItem('userName', finalData[0].displayName)
      localStorage.setItem(('authLevel'), finalData[0].authLevel)
      localStorage.setItem('role', finalData[0].role)
      localStorage.setItem('teamKey', finalData[0].team_key)
      localStorage.setItem('teamName', finalData[0].team_name)
    });


    this.firstChartOptions = {
      series: [0],
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "50%"
          }
        }
      },
      labels: ["Tamamlama Yüzdesi"]
    };



    this.secondChartOptions = {
      series: [0, 0, 0],
      labels: ['Başarısız', 'Başarılı', 'İptal'],
      chart: {
        type: "donut"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }

    this.thirdChartOptions = {
      series: [
        {
          name: "basic",
          data: this.dashboardService.datas
        }
      ],
      chart: {
        type: "bar",
        height: 300
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [' .', '. ', '. ', '. ', '. ']
      },
      yaxis:{
        max:100,
        decimalsInFloat:0
      }


    }




  }

  ngOnInit() {
    this.shared.getSearchValue().subscribe(val=>{
      this.search = val
    })
    this.dashboardService.teamComparison(),
      this.dashboardService.taskAnalyses().once('value', snap => {
        this.taskList = []
        var data: taskModel
        this.successfulCount = 0
        this.unsuccessfulCount = 0
        this.cancelledCount = 0
        this.completedCount = 0
        snap.forEach(child => {
          this.taskList.push(child.val())
          data = child.val()
          if (data.status == 'Kapandı' && data.result == 'Başarılı') {
            this.successfulCount++
          }
          if (data.status == 'Kapandı' && data.result == 'Başarısız') {
            this.unsuccessfulCount++
          }
          if (data.status == 'Kapandı' && data.result == 'İptal') {
            this.cancelledCount++
          }
          if (data.status == 'Kapandı') {
            this.completedCount++
          }

        })
        this.secondChartOptions.series = [this.successfulCount, this.unsuccessfulCount, this.cancelledCount]
        this.firstChartOptions.series = [this.completedCount * (100 / this.taskList.length)]
        this.thirdChartOptions.series = [
          {
            name: "basic",
            data: this.dashboardService.datas
          }
        ],
          this.thirdChartOptions.xaxis = {
            categories: this.dashboardService.labels
          }


      })






    this.dashboardService.getTodos(localStorage.getItem('userKey')).on('value', snapshot => {
      this.todos = []
      snapshot.forEach(child => {
        this.todos.push(child.val())
      })
    })

    this.myTeamService.getMemberByTeamKey().once('value', snapshot => {
      this.teamMembers = []
      snapshot.forEach(child => {
        this.teamMembers.push(child.val())
      })
    })







    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("bigDashboardChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    this.lineBigDashboardChartData = [
      {
        label: "Data",

        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,

        borderWidth: 2,
        data: [25, 50, 60, 37, 83, 90, 55]
      }
    ];
    this.lineBigDashboardChartColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        pointBorderColor: this.chartColor,
        pointBackgroundColor: "#2c2c2c",
        pointHoverBackgroundColor: "#2c2c2c",
        pointHoverBorderColor: this.chartColor,
      }
    ];
    this.lineBigDashboardChartLabels = ["PZT", "SAL", "ÇAR", "PERŞ", "CUM", "CMT", "PAZ"];
    this.lineBigDashboardChartOptions = {

      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 0
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      legend: {
        position: "bottom",
        fillStyle: "#FFF",
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10
          },
          gridLines: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent"
          }

        }],
        xAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            display: false,

          },
          ticks: {
            padding: 10,
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold"
          }
        }]
      }
    };

    this.lineBigDashboardChartType = 'line';


    this.gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
            stepSize: 500
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.canvas = document.getElementById("lineChartExample");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    this.lineChartData = [
      {
        label: "Active Users",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
      }
    ];
    this.lineChartColors = [
      {
        borderColor: "#f96332",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#f96332",
        backgroundColor: this.gradientFill
      }
    ];
    this.lineChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.lineChartOptions = this.gradientChartOptionsConfiguration;

    this.lineChartType = 'line';

    this.canvas = document.getElementById("lineChartExampleWithNumbersAndGrid");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#18ce0f');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));

    this.lineChartWithNumbersAndGridData = [
      {
        label: "Email Stats",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
      }
    ];
    this.lineChartWithNumbersAndGridColors = [
      {
        borderColor: "#18ce0f",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#18ce0f",
        backgroundColor: this.gradientFill
      }
    ];
    this.lineChartWithNumbersAndGridLabels = ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"];
    this.lineChartWithNumbersAndGridOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

    this.lineChartWithNumbersAndGridType = 'line';




    this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


    this.lineChartGradientsNumbersData = [
      {
        label: "Active Countries",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
      }
    ];
    this.lineChartGradientsNumbersColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
      }
    ];
    this.lineChartGradientsNumbersLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.lineChartGradientsNumbersOptions = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
            stepSize: 20
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    }

    this.lineChartGradientsNumbersType = 'bar';
    this.router.navigate(['#'])
  }

  addTodoItem() {
    this.dashboardService.addTodoItem(this.tempTodo)
  }

  updateTodoItem(todo) {
    this.dashboardService.updateItem(todo)
  }

  updateToCompleted(todo: personalTaskModel) {
    todo.completed = true
    this.dashboardService.updateItem(todo)
  }
  updateFromCompleted(todo: personalTaskModel) {
    todo.completed = false
    this.dashboardService.updateItem(todo)
  }

}
