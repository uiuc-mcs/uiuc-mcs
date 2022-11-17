import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/classes/class.service';
import { getRouterLink, ClassData, mcsCategories,
     mcsdsCategories, Semesters} from '../../shared/class/class'

interface FilterOption {
    value: string;
    view: string;
}

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss'],
})

export class CourseListComponent implements AfterViewInit {
    classes: ClassData[] = []
    dataSource = new MatTableDataSource<ClassData>()
    displayedColumns: string[] = [
        'CourseNumber',
        'ClassName',
        'RatingCount',
        'DifficultyAvg',
        'WorkloadAvg',
        'RatingAvg',
        'Semester',
    ]
    mcsOptions: FilterOption[]
    mcsdsOptions: FilterOption[]
    semesterOptions: FilterOption[]

    emptyFilter: FilterOption = { value: '', view: '' }
    mcsValue: string = this.emptyFilter.value
    mcsdsValue: string = this.emptyFilter.value
    semesterValue: string = this.emptyFilter.value

    getRouterLink = getRouterLink

    makeOptions(cats: string[]) {
        // Construct the array of options filters
        var ret = [this.emptyFilter]
            .concat(cats.reduce(function (s: any, a: any) {
                // Remove "MCS " "MCSDS " from the option views
                s.push({ value: a, view: a.replace(/MCS |MCSDS /g, "") });
                return s;
            }, [])
            )
        return ret
    }

    objectKeys = Object.keys
    @ViewChild(MatSort) sort!: MatSort
    constructor(
        private courses: ClassService,
        private router: Router
    ) {
        this.mcsOptions = this.makeOptions(mcsCategories)
        this.mcsdsOptions = this.makeOptions(mcsdsCategories)
        this.semesterOptions = this.makeOptions(Semesters)
    }

    ngAfterViewInit(): void {
        this.courses.classes.subscribe((data: ClassData[]) => {
            this.classes = data
            this.dataSource = new MatTableDataSource(this.classes)
            this.dataSource.sort = this.sort
            this.dataSource.filterPredicate = (data, filterStr) => {
                const filterData: { mcsValue: string, mcsdsValue: string, semesterValue: string } = JSON.parse(filterStr);
                let showData = true;
                
                if(filterData.mcsValue && data.category) {
                    showData &&= data.category.includes(filterData.mcsValue);
                }

                if(filterData.mcsdsValue && data.category) {
                    showData &&= data.category.includes(filterData.mcsdsValue);
                }

                if(filterData.semesterValue == 'Spring') {
                    showData &&= data.season.spring;
                }

                if(filterData.semesterValue == 'Summer') {
                    showData &&= data.season.spring;
                }

                if(filterData.semesterValue == 'Fall') {
                    showData &&= data.season.spring;
                }
                
                return showData
            }
        });
    }

    updateFilter() {
        this.dataSource.filter = JSON.stringify({
            mcsValue: this.mcsValue,
            mcsdsValue: this.mcsdsValue,
            semesterValue: this.semesterValue,
        })
    }

    updateMcsFilter() {
        this.mcsdsValue = this.emptyFilter.value; // Only filter mcs or mcsds at a time
        this.updateFilter()
    }

    updateMcsdsFilter() {
        this.mcsValue = this.emptyFilter.value; // Only filter mcs or mcsds at a time
        this.updateFilter()
    }

    trackById(index: number, item: ClassData) {
        return item.ClassName
    }

    rowClick(ev: MouseEvent, course: ClassData) {
        const link = getRouterLink(course)
        if (ev.ctrlKey || ev.metaKey) {
            this.router.navigate([]).then(result => { window.open(link); });
        }
        else {
            this.router.navigate([link]);
        }
    }
}
