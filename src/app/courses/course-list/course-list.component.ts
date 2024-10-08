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
        this.courses.classes.subscribe(data => {
            var ret: ClassData[] = []
            for (var x of data){
                x.season_str = []
                if (x.season.fall) {
                    x.season_str.push("fall")
                }
                if (x.season.spring) {
                    x.season_str.push("spring")
                }
                if (x.season.summer) {
                    x.season_str.push("summer")
                }
                ret.push(x)
            }
            this.classes = ret
            // console.log(data)
            this.dataSource = new MatTableDataSource(this.classes)
            this.dataSource.sort = this.sort
        });
    }

    onSemesterFilterClick() {
        this.mcsValue = this.emptyFilter.value
        this.mcsdsValue = this.emptyFilter.value

        var targetValue = this.semesterValue

        const filterValue = targetValue.trim().toLocaleLowerCase();
        // console.log(filterValue)
        this.dataSource.filter = filterValue;
    }

    onFilterOptionClick(isMCSDS: boolean) {
        var targetValue = this.emptyFilter.value
        if (isMCSDS) {
            this.mcsValue = this.emptyFilter.value
            this.semesterValue = this.emptyFilter.value

            var targetValue = this.mcsdsValue
        } else {
            this.mcsdsValue = this.emptyFilter.value
            this.semesterValue = this.emptyFilter.value

            var targetValue = this.mcsValue
        }
        const filterValue = targetValue.trim().toLocaleLowerCase();
        // console.log(filterValue)
        this.dataSource.filter = filterValue;
    }

    trackById(index: number, item: ClassData) {
        return item.ClassName
    }

    rowClick(ev: MouseEvent, course: ClassData) {
        const link = getRouterLink(course)
        // console.log(link)
        // if (ev.button === 1 || (ev.ctrlKey && ev.button === 0)) {
        if (ev.ctrlKey || ev.metaKey) {
            this.router.navigate([]).then(result => { window.open(link); });
        }
        else {
            this.router.navigate([link]);
        }
    }
}
