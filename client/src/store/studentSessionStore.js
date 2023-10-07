import axios from 'axios';
import { create } from "zustand";

const studentSessionStore = create((set) => ({
    ssmsgType: null,
    ssmsg: null,
    studentSession: null,
    createForm: {
        studentCode: '',
        sessionCode: ''
    },
    updateForm: {
        _id: null,
        studentCode: '',
        sessionCode: ''
    },

    getStudentSession: (studentSession) => {
        set({ studentSession: studentSession })
        set({
            updateForm: {
                _id: studentSession._id,
                studentCode: studentSession.studentCode,
                sessionCode: studentSession.sessionCode
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

    createStudentSession: async (e) => {
        e.preventDefault();
        const studentSession = studentSessionStore.getState().createForm;
        var res = await axios.post("http://localhost:80/studentSession/new", studentSession);
        set({ ssmsg: res.data.msg })
        set({ ssmsgType: res.data.msgType })
    },

    deleteStudentSession: async (_id) =>{
        await axios.delete(`http://localhost:80/studentSession/delete/${_id}`);
    },

    updateStudentSession: async (e) => {
        e.preventDefault();
        const studentSession = studentSessionStore.getState().updateForm;
        const studentSessionID = studentSessionStore.getState().updateForm._id
        var res = await axios.post(`http://localhost:80/studentSession/update/${studentSessionID}`, studentSession);
        set({ ssmsg: res.data.msg })
        set({ ssmsgType: res.data.msgType })
    }
}));

export default studentSessionStore;