import { Component, ElementRef, AfterViewInit, ViewChild, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from "chart.js";
import randomColor from 'randomColor';
import { ClassService } from 'src/app/services/classes/class.service';
import { getRouterLink } from 'src/app/shared/class/class';


@Component({
  selector: 'app-course-chart',
  templateUrl: './course-chart.component.html',
  styleUrls: ['./course-chart.component.scss']
})
export class CourseChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') public canvas?: ElementRef<HTMLCanvasElement>;
  public chart: Chart | undefined;
  public courseData: any[] = [];

  constructor(private courses: ClassService, private router: Router) {
    Chart.register(...registerables);
  }

  public ngOnInit(): void {
    this.courses.classes.subscribe(classes => {
      this.courseData = classes.map(classData => ({
        label: classData.CourseNumber,
        data: [{
          x: classData.DifficultyAvg,
          y: classData.RatingAvg,
          r: classData.RatingCount,
        }],
        backgroundColor: randomColor(),
        classData: classData,
      }));
      this.redrawChart();
    });
  }

  public ngAfterViewInit(): void {
    this.redrawChart();
  }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.redrawChart();
  }

  public redrawChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }

    if (this.canvas) {
      this.chart = new Chart(this.canvas.nativeElement, {
        type: 'bubble',
        data: {
          datasets: this.courseData,
        },
        options: {
          animation: false,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Difficultly (1-5)'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Rating (1-5)'
              }
            },
          },
          onClick: (_, chartElements) => {
            const index = chartElements[0].index;
            const link = getRouterLink(this.courseData[index].classData);
            this.router.navigate([link]);
          },
          onHover: (event, chartElements) => {
            (event!.native!.target as any).style.cursor = chartElements[0] ? 'pointer' : 'default';
          },
          plugins: {
            legend: {
              position: "bottom"
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const classData = this.courseData[context.dataIndex].classData;
                  return [
                    `Course Name: ${classData.ClassName}`,
                    `Course Number: ${classData.CourseNumber}`,
                    `Reviews: ${classData.RatingCount}`,
                    `Difficulty: ${classData.DifficultyAvg.toFixed(2)}`,
                    `Rating: ${classData.RatingAvg.toFixed(2)}`,
                  ];
                }
              }
            },
          }
        }
      });
    }
  }
}
