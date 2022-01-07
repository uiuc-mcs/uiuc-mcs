import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/services/classes/class.service';
import { getRouterLink, ClassData, courseCategories, courseLanguages } from 'src/app/shared/class/class';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-edit-course-metadata',
  templateUrl: './edit-course-metadata.component.html',
  styleUrls: ['./edit-course-metadata.component.scss'],
  providers: [TitleCasePipe],
})
export class EditCourseMetadataComponent implements OnInit {
  courseName: string = ""
//   fields: string[] = ["exams", "homework", "projects", "proofs", "peer reviewed"]
  languages = courseLanguages
  categories = courseCategories
  courseMetadataForm!: FormGroup
  courseData: ClassData | undefined

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private courseService: ClassService,
    private afs: AngularFirestore,
    private router: Router,
    private tc: TitleCasePipe,
  ) {
  }

  ngOnInit(): void {
    this.courseName = this.route.snapshot.paramMap.get('courseId') || ""
    this.courseMetadataForm = this.formBuilder.group({
      category: ['', Validators.required],
      seasonSpring: [false, Validators.required],
      seasonSummer: [false, Validators.required],
      seasonFall: [false, Validators.required],
    //   exams: ['', Validators.required],
    //   examsBool: ['', Validators.required],
    //   homework: ['', Validators.required],
    //   homeworkBool: ['', Validators.required],
      languages: [''],
    //   projects: ['', Validators.required],
    //   projectsBool: ['', Validators.required],
    //   proofs: ['', Validators.required],
    //   proofsBool: ['', Validators.required],
    //   "peer reviewed": ['', Validators.required],
    //   "peer reviewedBool": ['', Validators.required],
    //   "slack channel": ['', Validators.required],
    //   "slack channelBool": ['', Validators.required],
    //   "slack channelLink": ['', Validators.required],
    })
    this.courseService.classes.subscribe(data => {
      this.courseData = data.find(x => x.ClassName == this.courseName)
      this.f.category.setValue(this.courseData?.category)
      this.f.seasonSpring.setValue(this.courseData?.season.spring)
      this.f.seasonSummer.setValue(this.courseData?.season.summer)
      this.f.seasonFall.setValue(this.courseData?.season.fall)
      this.f.languages.setValue(this.courseData?.languages)
    //   this.setFieldData(this.f["slack channel"], this.f["slack channelBool"], "#" + this.courseData?.SlackChannel)
    //   this.setFieldData(this.f["slack channelLink"], this.f["slack channelBool"], this.courseData?.SlackChannelLink)
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

  onSubmit(): void {
    this.afs
      .collection("Class")
      .doc(this.courseData?.courseId)
      .update({
        category: this.f.category.value,
        season: {
          spring: this.f.seasonSpring.value,
          summer: this.f.seasonSummer.value,
          fall: this.f.seasonFall.value
        },
        languages: this.f.languages.value,
      }).then(() => {
        this.courseService.updateCourseData()
        var link = 'home'
        if (this.courseData) {
            link = getRouterLink(this.courseData)
        }
        this.router.navigate([link])
      })
  }
}
