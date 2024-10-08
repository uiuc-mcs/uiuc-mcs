import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClassData, courseCategories, courseLanguages } from 'src/app/shared/class/class';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-course-create',
    templateUrl: './course-create.component.html',
    styleUrls: ['./course-create.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, ReactiveFormsModule, MatCardModule]
})
export class CreateCourseComponent implements OnInit {
    courseName: string = ""
    languages = courseLanguages
    categories = courseCategories
    courseMetadataForm!: FormGroup
    courseData: ClassData | undefined

    constructor(
        private formBuilder: FormBuilder,
        private afs: Firestore,
    ) {
    }
    classFields = [
        { field: 'ClassName', display: 'Class Name' },
        { field: 'CourseNumber', display: 'Course Number' },
        { field: 'GraphicUrl', display: 'Graphic URL (from course page - url(https://...) )' },
    ]

    ngOnInit(): void {
        this.courseMetadataForm = this.formBuilder.group({
            ClassName: ['', Validators.required],
            CourseNumber: ['', Validators.required],
            DifficultyAvg: [0, Validators.required],
            DifficultyCount: [0, Validators.required],
            GraphicUrl: ['url(https://ws.engr.illinois.edu/images/block.i.color.png)', Validators.required],
            RatingAvg: [0, Validators.required],
            RatingCount: [0, Validators.required],
            WorkloadAvg: [0, Validators.required],
            WorkloadCount: [0, Validators.required],
            category: ['', Validators.required],
            languages: ['', Validators.required],
            seasonSpring: [false, Validators.required],
            seasonSummer: [false, Validators.required],
            seasonFall: [false, Validators.required],
        })
    }

    get f() {
        return this.courseMetadataForm?.controls
    }

    setFieldData(field: AbstractControl, fieldBool: AbstractControl, fieldValue: any): void {
        fieldValue ? field.setValue(fieldValue) : ""
        fieldValue ? fieldBool.setValue("true") : fieldBool.setValue("false")
        fieldValue ? field.enable() : field.disable()
        fieldBool.valueChanges.subscribe(val => { val == "true" ? field.enable() : field.disable() })
    }

    async onSubmit() {
        const ref = collection(this.afs, 'Class')
        await addDoc(ref, {
            ClassName: this.f.ClassName.value,
            CourseNumber: this.f.CourseNumber.value,
            DifficultyAvg: this.f.DifficultyAvg.value,
            DifficultyCount: this.f.DifficultyCount.value,
            GraphicUrl: this.f.GraphicUrl.value,
            RatingAvg: this.f.RatingAvg.value,
            RatingCount: this.f.RatingCount.value,
            WorkloadAvg: this.f.WorkloadAvg.value,
            WorkloadCount: this.f.WorkloadCount.value,
            category: [],
            languages: [],
            season: {
                spring: this.f.seasonSpring.value === "true",
                summer: this.f.seasonSummer.value === "true",
                fall: this.f.seasonFall.value === "true",
            },
        })
            .then(result => {
                window.alert("Added! Reload the window to add another one.")
                location.reload()
            }, error => {
                console.error("Create Review: Submission failed -", error)
                window.alert("Error! See the console for more.")
            })
    }
}
