export class Requests {
  static getUrl = () => {
    return `${process.env.REACT_APP_REQUESTS_PROTOCOL}://${process.env.REACT_APP_REQUESTS_DOMAIN}`;
  };

  static loginUser = async (username, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };
    const res = await fetch(
      `${Requests.getUrl()}/player/login/`,
      requestOptions
    );
    return await res.json();
  };

  static registerUser = async (email, username, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    };
    const res = await fetch(
      `${Requests.getUrl()}/player/register/`,
      requestOptions
    );
    return await res.json();
  };

  static listMatches = async () => {
    const requestOptions = {
      method: "GET",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };
    return fetch(
      `${Requests.getUrl()}/lobby/lobby/`,
      requestOptions
    ).then((res) => res.json());
  };

  static createMatch = async () => {
    const requestOptions = {
      method: "POST",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };
    return fetch(
      `${Requests.getUrl()}/match/match/`,
      requestOptions
    ).then((res) => res.json());
  };

  static joinMatch = async (matchId) => {
    const requestOptions = {
      method: "POST",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };
    return fetch(
      `${Requests.getUrl()}/match/match/join/${matchId}/`,
      requestOptions
    ).then((res) => res.json());
  };

  static getMatchStatus = async (matchId) => {
    const requestOptions = {
      method: "GET",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };
    return fetch(
      `${Requests.getUrl()}/match/match/status/${matchId}/`,
      requestOptions
    ).then((res) => res.json());
  };

  static getMatchData = async (matchId) => {
    const requestOptions = {
      method: "GET",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };
    return fetch(
      `${Requests.getUrl()}/match/match/${matchId}/`,
      requestOptions
    ).then((res) => res.json());
  };

  static leaveMatch = async (matchId) => {
    const requestOptions = {
      method: "POST",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };
    return fetch(
      `${Requests.getUrl()}/match/match/leave/${matchId}/`,
      requestOptions
    ).then((res) => res.json());
  };

  static play = async (matchId, body) => {
    const requestOptions = {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: body,
    };
    return fetch(
      `${Requests.getUrl()}/match/match/play/${matchId}/`,
      requestOptions
    ).then((res) => res.json());
  };
}
