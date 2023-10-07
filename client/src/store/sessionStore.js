import axios from 'axios';
import { create } from "zustand";

const sessionStore = create((set) => ({
    smsgType: null,
    smsg: null,
    session: null,
    createForm: {
        start_time: '',
        end_time: '',
        dayOfTheWeek: '',
        course: null,
        max_Students: null,
        instructor: ''
    },
    updateForm: {
        _id: null,
        start_time: '',
        end_time: '',
        dayOfTheWeek: '',
        course: null,
        max_Students: null,
        instructor: ''
    },

    getSession: (session) => {
        set({ session: session })
        set({
            updateForm: {
                _id: session._id,
                start_time: session.start_time,
                end_time: session.end_time,
                dayOfTheWeek: session.dayOfTheWeek,
                course: session.course,
                max_Students: session.max_Students,
                instructor: session.instructor
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
        console.log(sessionStore.getState().updateForm);
    },

    createSession: async (e) => {
        e.preventDefault();
        const session = sessionStore.getState().createForm;
        var res = await axios.post("http://localhost:80/session/new", session);
        set({ smsg: res.data.msg })
        set({ smsgType: res.data.msgType })
    },

    deleteSession: async (_id) =>{
        await axios.delete(`http://localhost:80/session/delete/${_id}`);
    },

    updateSession: async (e) => {
        e.preventDefault();
        const session = sessionStore.getState().updateForm;
        const sessionID = sessionStore.getState().updateForm._id
        var res = await axios.post(`http://localhost:80/session/update/${sessionID}`, session);
        set({ smsg: res.data.msg })
        set({ smsgType: res.data.msgType })
        /* set({
            updateForm:{
                _id: null,
                start_time: '',
                end_time: '',
                dayOfTheWeek: '',
                course: '',
                max_Students: null,
                instructor: ''
            }
        });*/
    }
}));

export default sessionStore;