import axios from "axios";

import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_LOADING,
	GET_ERRORS,
	CLEAR_CURRENT_PROFILE,
	SET_CURRENT_USER
} from "./types";

export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get("/api/profile")
		.then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
		.catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};

export const setProfileLoading = () => dispatch => {
	dispatch({
		type: PROFILE_LOADING
	});
};

export const clearCurrentProfile = () => dispatch => {
	dispatch({
		type: CLEAR_CURRENT_PROFILE
	});
};

export const createProfile = (profileData, history) => dispatch => {
	axios
		.post("/api/profile", profileData)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const deleteAccount = () => dispatch => {
	if (window.confirm("Are you sure?")) {
		axios
			.delete("/api/profile")
			.then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
			.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
	}
};

export const addExperience = (expData, history) => dispatch => {
	axios
		.post("/api/profile/experience", expData)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const addEducation = (eduData, history) => dispatch => {
	axios
		.post("/api/profile/education", eduData)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const deleteExperience = expId => dispatch => {
	if (window.confirm("Are you sure?")) {
		axios
			.delete(`/api/profile/experience/${expId}`)
			.then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
			.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
	}
};

export const deleteEducation = eduId => dispatch => {
	if (window.confirm("Are you sure?")) {
		axios
			.delete(`/api/profile/education/${eduId}`)
			.then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
			.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
	}
};

export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get("/api/profile/all")
		.then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
		.catch(err => dispatch({ type: GET_PROFILES, payload: null }));
};

export const getProfileByHandle = handle => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get(`/api/profile/handle/${handle}`)
		.then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
		.catch(err => dispatch({ type: GET_PROFILE, payload: null }));
};
