"use client";
import { useMemo, useState } from 'react';
  import styles from "@/components/common/Common.module.css";
  import { apiAdminGetCourses, apiGetCourseLevels, apiGetPrereqLevels, apiGetTerms } from "@/app/api";
  import { useCookies } from "next-client-cookies";
  import Select from "react-dropdown-select";
  

var reloadUsers = true;


function PreRow({allPrereqs, index, prereqOptionsLevelLoaded}){

    console.log(prereqOptionsLevelLoaded)
    const [prereqOptionsLevel, setPrereqOptionsLevel] = useState([]) //{level: "level"}
    const [prereqOptionsCourse, setPrereqOptionsCourse] = useState([])

    function prereqLevelChanged(values){
        console.log(allPrereqs)
        var filtered = []
        for(var i = 0; i < allPrereqs.length; ++i){
            if(allPrereqs[i].level == values[0].level) filtered.push(allPrereqs[i])
        }
        console.log(filtered)
        setPrereqOptionsCourse(filtered)
    }
    function setValues(val){
        console.log("inside")
    }
    return(
        <div key={index} className="text-left pb-5 flex flex-row">
        <label className='text-2xl pl-5'> Level </label>
        <Select
            options={prereqOptionsLevelLoaded}
            labelField="level"
            valueField="level"
            className='text-2xl pl-5'
            onChange={(values) => prereqLevelChanged(values)}
        />
        <label className='text-2xl pl-5'> Course </label>
        <Select
            options={prereqOptionsCourse}
            labelField="courseName"
            valueField="courseName"
            className='text-2xl pl-5'
            onChange={(values) => setValues(values)}
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
  const [courseOptionsLevel, setCourseOptionsLevel] = useState([])
  const [courseOptionsCourse, setCourseOptionsCourse] = useState([])

  const [allPrereqs] = useState([])
  const [allCourses] = useState([])

  const [preReqRows, setPrereqRows] = useState([])

  const onLoad = async () => {
    const data = await apiAdminGetCourses(cookies.get("api_token"));
    for(var i =0; i<data.length; ++i){
        if(data[i].isPrereq == 1) allPrereqs.push(data[i])
        else  allCourses.push(data[i])
    }
    //setPrereqOptionsCourse(allPrereqs)
    setCourseOptionsCourse(allCourses)
    const data1 = await apiGetTerms(cookies.get("api_token"));
    setTermOptions(data1);
    const data2 = await apiGetPrereqLevels(cookies.get("api_token"));
    setPrereqOptionsLevelLoaded(data2)
    const data3 = await apiGetCourseLevels(cookies.get("api_token"));
    setCourseOptionsLevel(data3)
    //setPrereqRows([...preReqRows, <PreRow index={0} allPrereqs={allPrereqs} prereqOptionsLevelLoaded={prereqOptionsLevelLoaded}/>])
  };
  
  if (reloadUsers) {
    //setPrereqRows([...preReqRows, "son of a"])
    onLoad();
    reloadUsers = false;
  }
  function setValues(values, val){
    console.log(values)
    console.log(val)
    }

    function addPrereq(){
        console.log(preReqRows.length)
        setPrereqRows([...preReqRows, <PreRow index={preReqRows.length} allPrereqs={allPrereqs} prereqOptionsLevelLoaded={prereqOptionsLevelLoaded}/>])
    }

    function addCourse(e){
        console.log(e)
    }
    function courseLevelChanged(values){
        var filtered = []
        for(var i = 0; i < allCourses.length; ++i){
            if(allCourses[i].level == values[0].level) filtered.push(allCourses[i])
        }
        setCourseOptionsCourse(filtered)
    }

    function onSubmit(e){
        const ele = document.getElementById('hahah');
        console.log(ele)
    }

      return (
        <div className={styles.mainFormUser}>
            <label className="text-5xl pl-5">Term Data</label>
            <div className={styles.simpleDivision}></div>
            <div className="text-left pb-5 flex flex-row" id="hahah">
                <label className='text-2xl pl-5'> Last Term </label>
                <Select
                    options={termOptions}
                    labelField="term"
                    valueField="term"
                    id="haha"
                    onChange={(values) => setLastTerm(values[0].term)}
                />
                <label className='text-2xl pl-5'> Last GPA </label>
                <input
                //ref={refInputPasswordRetyped}
                className='text-2xl pl-5'
                value={gpa}
                onChange={(e) => setGPA(e.target.value)}
                placeholder="4.0"
            />
            <label className='text-2xl pl-5'> Current Term </label>
            <Select
                options={termOptions}
                labelField="term"
                valueField="term"
                className='text-2xl pl-5'
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
                onClick={addPrereq}
                >
                Add
            </button>
            </div>
            </div>
            <div className={styles.simpleDivision}></div>
            <div className="text-left pb-5 flex flex-row">
            <label className='text-2xl pl-5'> Level </label>
            <Select
                options={courseOptionsLevel}
                labelField="level"
                valueField="level"
                className='text-2xl pl-5'
                onChange={(values) => courseLevelChanged(values)}
            />
            <label className='text-2xl pl-5'> Course </label>
            <Select
                options={courseOptionsCourse}
                labelField="courseName"
                valueField="courseName"
                className='text-2xl pl-5'
                onChange={(values) => setValues(values)}
            />
            </div>
            <div className={styles.simpleDivision}></div>
            <div className="px-[67px] pb-[30px] content-center">
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

/*
            <div key={i} className="text-left pb-5 flex flex-row">
            <label className='text-2xl pl-5'> Level </label>
            <Select
                options={prereqOptionsLevel}
                labelField="level"
                valueField="level"
                className='text-2xl pl-5'
                id="prereqLevel-{key}"
                onChange={(values) => prereqLevelChanged(values)}
            />
            <label className='text-2xl pl-5'> Course </label>
            <Select
                options={prereqOptionsCourse}
                labelField="courseName"
                valueField="courseName"
                className='text-2xl pl-5'
                onChange={(values) => setValues(values, `prereqCourse-${i}`)}
            />
            </div>
*/