"use client";
import { useState, useEffect } from 'react';
  import styles from "@/components/common/Common.module.css";
  import { apiAdminGetCourses, apiGetCourseLevels, apiGetPrereqLevels, apiGetTerms, apiSubmitSheet, apiGetCoursesTaken } from "@/app/api";
  import { useCookies } from "next-client-cookies";
  import Select from "react-dropdown-select";

function LevelCourseRow({allOptions, index, optionsLevels, selection, setSelection}){
    const [optionsCourse, setOptionsCourse] = useState([])
    const [selectedLevel, setSelectedLevel] = useState(0)
    const [selectedCourse, setSelectedCourse] = useState("")

    function updateSelection(level, course){
        selection[index] = {Level: level, Course: course}
        setSelection(selection)
    }
    function prereqLevelChanged(value){
        setSelectedLevel(value[0].level)
        updateSelection(value[0].level, selectedCourse)
        var filtered = []
        for(var i = 0; i < allOptions.length; ++i){
            if(allOptions[i].level == value[0].level) filtered.push(allOptions[i])
        }
        setOptionsCourse(filtered)
    }
    function setValues(value){
        setSelectedCourse(value[0].courseName)
        updateSelection(selectedLevel, value[0].courseName)
    }
    return(
        <div key={index} className="text-left pb-5 pl-5 pr-40 flex flex-row ">
        <label className='text-2xl pt-2 pr-3'> Level: </label>
        <Select
            options={optionsLevels}
            labelField="level"
            valueField="level"
            className='text-2xl pl-3 w-40'
            onChange={(value) => prereqLevelChanged(value)}
        />
        <label className='text-2xl pl-20 pt-2 pr-3'> Course: </label>
        <Select
            options={optionsCourse}
            labelField="courseName"
            valueField="courseName"
            className='text-2xl w-40 pl-3 '
            onChange={(value) => setValues(value)}
        />
        </div>
    )

}
export default function SheetCreation() {
  const cookies = useCookies();
  const [gpa, setGPA] = useState("");
  const [currentTerm, setCurrentTerm] = useState("")
  const [lastTerm, setLastTerm] = useState("")
  const [termOptions, setTermOptions] = useState([])
  const [prereqOptionsLevelLoaded, setPrereqOptionsLevelLoaded] = useState([])
  const [courseOptionsLevelLoaded, setCourseOptionsLevelLoaded] = useState([])
  const [coursesTaken, setCoursesTaken] = useState([])

  const [allPrereqs, setAllPrereqs] = useState([])
  const [allCourses, setAllCourses] = useState([])

  const [preReqRows, setPrereqRows] = useState([])
  const [courseRows, setCourseRows] = useState([])

  const [selectedPrereqs, setSelectedPrereq] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [err, setErr] = useState([])
  const [infoState, setInfoState] = useState(0)

  useEffect(() => {
    onEffect();
  },[])

  const onEffect = async () => {
    const data = await apiAdminGetCourses(cookies.get("api_token"));
    var tmp_pre = []
    var tmp_course = []
    data.forEach((course)=> {
        if(course.isPrereq == 1) tmp_pre.push(course)
        else  tmp_course.push(course)
      })
    setAllPrereqs(tmp_pre)
    setAllCourses(tmp_course)
    const data1 = await apiGetTerms(cookies.get("api_token"));
    setTermOptions(data1);
    const data2 = await apiGetPrereqLevels(cookies.get("api_token"));
    setPrereqOptionsLevelLoaded(data2)
    const data3 = await apiGetCourseLevels(cookies.get("api_token"));
    setCourseOptionsLevelLoaded(data3)
    const data4 = await apiGetCoursesTaken(cookies.get("api_token"), cookies.get("userID"))
    setCoursesTaken(data4)
    //setPrereqRows([...preReqRows, <LevelCourseRow index={preReqRows.length} allOptions={allPrereqs} optionsLevels={prereqOptionsLevelLoaded}/>])
  };
  

    function addPrereq(){
        setSelectedPrereq([...selectedPrereqs, {Level: 0, Course: ""}])
        setPrereqRows([...preReqRows, <LevelCourseRow index={preReqRows.length} allOptions={allPrereqs} optionsLevels={prereqOptionsLevelLoaded} selection={selectedPrereqs} setSelection={setSelectedPrereq}/>])
    }

    function addCourse(){
        setSelectedCourses([...courseRows, {Level: 0, Course: ""}])
        setCourseRows([...courseRows, <LevelCourseRow index={courseRows.length} allOptions={allCourses} optionsLevels={courseOptionsLevelLoaded} selection={selectedCourses} setSelection={setSelectedCourses}/>])
    }

    const onSubmit = async (e) => {
        // Check terms
        var tmp_errors = []
        if(lastTerm == ""){
            tmp_errors.push("Last Term is blank")
        }
        if(currentTerm == ""){
            tmp_errors.push("Current Term is blank")
        }
        // Check GPA
        const float_gpa = parseFloat(gpa)
        if(isNaN(float_gpa)){
            tmp_errors.push("GPA is not valid")
            //setErr([...err, {msg:"haha"}])
        }
        // Check prereq rows
        const preReqRowNum = preReqRows.length;
        if(preReqRowNum != 0){
            if(preReqRows[preReqRowNum-1].props.selection.length == 0){
                tmp_errors.push("In Pre-requisites  (row 0): Invalid")
            }
            //console.log(preReqRows[preReqRowNum-1].props.selection)
            preReqRows[preReqRowNum-1].props.selection.forEach((selection, index) => {
                if(selection.Level == 0){
                    tmp_errors.push("In Pre-requisites  (row "+ index +"): Invalid (no level selection)")
                }
                if(selection.Course == ""){
                    tmp_errors.push("In Pre-requisites  (row "+ index +"): Invalid (no course selection)")
                }
            })
        }
        // Check course
        const coursesNum = courseRows.length;
        if(coursesNum != 0){
            if(courseRows[coursesNum-1].props.selection.length == 0){
                tmp_errors.push("In Courses (row 0): is not valid")
            }
            courseRows[coursesNum-1].props.selection.forEach((selection, index) => {
                if(selection.Level == 0){
                    tmp_errors.push("In Courses (row "+ index +"): Invalid (no level selection)")
                }
                if(selection.Course == ""){
                    tmp_errors.push("In Courses (row "+ index +"): Invalid  (no course selection)")
                }
            })
        }
        setErr(tmp_errors)
        if(tmp_errors.length != 0){
            setInfoState(1)
            return;
        }
        // Check if selected courses are on other sheets
        coursesTaken.forEach((course) => {
            selectedPrereqs.forEach((pre) => {
                if(pre.Course == course.courseName){
                    tmp_errors.push("In Pre-requisites: " + course.courseName + " in \"" + course.status + "\" form")
                }
            })
            selectedCourses.forEach((c) => {
                if(c.Course == course.courseName){
                    tmp_errors.push("In Courses: " + course.courseName + " in \"" + course.status + "\" form")
                }
            })
        })
        setErr(tmp_errors)
        if(tmp_errors.length != 0){
            setInfoState(1)
            return;
        }
        setInfoState(2)
        await apiSubmitSheet(
            cookies.get("api_token"), cookies.get("userID"),
            lastTerm, currentTerm, gpa,
            selectedPrereqs, selectedCourses
        )
        onEffect()
    }

      return (
        <div className={styles.mainFormUser}>
            <label className="text-5xl pl-5">Header</label>
            <div className={styles.simpleDivision}></div>
            <div className="text-left pb-5 flex flex-row place-content-evenly">
                <label className='text-2xl pt-2'> Last Term: </label>
                <Select
                    options={termOptions}
                    labelField="term"
                    valueField="term"
                    className='text-2xl w-52'
                    onChange={(values) => setLastTerm(values[0].term)}
                />
                <label className='text-2xl pt-2'> Last GPA: </label>
                <input
                //ref={refInputPasswordRetyped}
                className='text-2xl w-14 pt-1 border-2 border-slate rounded'
                value={gpa}
                onChange={(e) => setGPA(e.target.value)}
                maxLength={4}
            />
            <label className='text-2xl pt-2'> Current Term: </label>
            <Select
                options={termOptions}
                labelField="term"
                valueField="term"
                className='text-2xl w-52'
                onChange={(values) => setCurrentTerm(values[0].term)}
            />
        </div>
        <div className={styles.simpleDivision}></div>


        <div className="content-stretch pb-5 flex-row">
            <label className="text-5xl pl-5">Pre-requisites</label>
            <div className='w-40 float-right pr-10'>
            <button
                type="button"
                className={styles.mainPageButton}
                onClick={addPrereq}
                >
                Add
            </button>
            </div>
            </div>
            <div className={styles.simpleDivision}></div>
            {preReqRows.map((val, i) => (
                preReqRows[i]
            ))}

            <div className={styles.simpleDivision}></div>
            <div className="content-stretch pb-5 flex-row">
            <label className="text-5xl pl-5">Courses</label>
            <div className='w-40 float-right pr-10'>
            <button
                type="button"
                className={styles.mainPageButton}
                onClick={addCourse}
                >
                Add
            </button>
            </div>
            </div>
            <div className={styles.simpleDivision}></div>

            {courseRows.map((val, i) => (
                courseRows[i]
            ))}
            
            <div className={styles.simpleDivision}></div>
            <div className="px-[67px] pb-[30px] content-center">
            {infoState == 2 ? (
                <span>
                <p className='text-center'>Successfully submitted advising sheet!</p>
                <p className='text-center'>You will get an email when the admin has responded to your form.</p>
                </span>
            ) : (
                <div>
                {err.map((val, i) => (
                    <p className='text-red-500'>{val}</p>
                ))}
                </div>
            )}
            <button
            type="button"
            className={styles.mainPageButton}
            onClick={onSubmit}
            >

            Submit
          </button>
          </div>
        </div>
        
        ); 

      
};
