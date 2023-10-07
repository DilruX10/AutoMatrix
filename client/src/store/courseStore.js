/** 
* Course:
*	_id
*	code / unique, auto
*	title
*	desc
*	numStudents
*	processingFee
*	sessionFee
*   vehicleTypes
**/

// import dependencies
import axios from 'axios';
import { create } from "zustand";

const courseStore = create((set) => ({
    cmsgType: null,
    cmsg: null,
    course: null,
    createForm: {
        title: '',
        description: '',
        processingFee: null,
        sessionFee: null,
        vehicleTypes: ''
    },
    updateForm: {
        _id: null,
        title: '',
        description: '',
        processingFee: null,
        sessionFee: null,
        vehicleTypes: '',
        num_Of_Students_Enrolled: null
    },

    getCourse: (course) => {
        set({ course: course })
        set({
            updateForm: {
                _id: course._id,
                title: course.title,
                description: course.description,
                processingFee: course.processingFee,
                sessionFee: course.sessionFee,
                vehicleTypes: course.vehicleTypes.join(";"),
                num_Of_Students_Enrolled: course.num_Of_Students_Enrolled
            }
        })
    },

    onChangeCreateFrom: (e) =>{
        e.preventDefault();
        set((state) => {
            return {
                createForm: {
                    ...state.createForm,
                    [e.target.name]: e.target.value
                }
            }
        })
    },

    onChangeUpdateFrom: (e) =>{
        e.preventDefault();
        set((state) => {
            return {
                updateForm: {
                    ...state.updateForm,
                    [e.target.name]: e.target.value
                }
            }
        })
    },

    // create function
    createCourse: async (e) => {
        e.preventDefault();
        const course = courseStore.getState().createForm;
        var res = await axios.post("http://localhost:80/course/new", course);
        set({ cmsg: res.data.msg })
        set({ cmsgType: res.data.msgType })
    },

    // delete function
    deleteCourse: async (_id) =>{
        await axios.delete(`http://localhost:80/course/delete/${_id}`);
    },

    // update function
    updateCourse: async (e) => {
        e.preventDefault();
        const course = courseStore.getState().updateForm;
        const courseID = courseStore.getState().updateForm._id
        var res = await axios.post(`http://localhost:80/course/update/${courseID}`, course);
        set({ cmsg: res.data.msg })
        set({ cmsgType: res.data.msgType })
    }
}));

export default courseStore;