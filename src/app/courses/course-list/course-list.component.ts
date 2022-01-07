import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/classes/class.service';
import { getRouterLink, ClassData, mcsCategories, mcsdsCategories } from '../../shared/class/class'

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
    emptyFilter: FilterOption = { value: '', view: '' }
    mcsValue: string = this.emptyFilter.value
    mcsdsValue: string = this.emptyFilter.value
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
    }

    ngAfterViewInit(): void {
        this.courses.classes.subscribe(data => {
            this.classes = data
            this.dataSource = new MatTableDataSource(this.classes)
            this.dataSource.sort = this.sort
        });
    }
    onFilterOptionClick(isMCSDS: boolean) {
        var targetValue = this.emptyFilter.value
        if (isMCSDS) {
            this.mcsValue = this.emptyFilter.value
            var targetValue = this.mcsdsValue
        } else {
            this.mcsdsValue = this.emptyFilter.value
            var targetValue = this.mcsValue
        }
        const filterValue = targetValue
            .trim().toLocaleLowerCase();
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
