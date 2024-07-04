"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  const input = document.querySelector(".form__input");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = input.value;
    if (username) {
      getUser(username);
    }
  });

  getUser("octocat");
});

const renderUser = function (data) {
  const avatar = document.querySelector(".user__avatar");
  const displayName = document.querySelector(".user__name");
  const userName = document.querySelector(".user__username");
  const dateJoined = document.querySelector(".user__date-joined");
  const bio = document.querySelector(".user__bio");
  const repos = document.querySelector(".user__stats-repo");
  const followers = document.querySelector(".user__stats-followers");
  const following = document.querySelector(".user__stats-following");
  const userLocation = document.querySelector(".user__location");
  const userWebsite = document.querySelector(".user__info-website");
  const twitterUrl = document.querySelector(".user__info-twitter");
  const company = document.querySelector(".user__info-company");

  avatar.src = data.avatar_url;

  displayName.textContent = data.name || data.login;
  userName.textContent = `@${data.login}`;
  userName.href = data.html_url;

  const date = new Date(data.created_at);
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getUTCFullYear();
  dateJoined.textContent = `Joined ${day} ${month} ${year}`;

  bio.textContent = data.bio || "This profile has no bio";
  bio.style.opacity = data.bio ? 1 : 0.5;

  repos.textContent = data.public_repos;
  followers.textContent = data.followers;
  following.textContent = data.following;

  userLocation.textContent = data.location || "Not Available";
  userLocation.style.opacity = data.location ? 1 : 0.5;

  if (data.blog) {
    userWebsite.textContent = data.blog;
    userWebsite.href = data.blog;
    userWebsite.style.opacity = 1;
  } else {
    userWebsite.textContent = "Not Available";
    userWebsite.style.opacity = 0.5;
    userWebsite.removeAttribute("href");
  }

  if (data.twitter_username) {
    twitterUrl.textContent = data.twitter_username;
    twitterUrl.href = `https://x.com/${data.twitter_username}`;
    twitterUrl.style.opacity = 1;
  } else {
    twitterUrl.textContent = "Not Available";
    twitterUrl.style.opacity = 0.5;
    twitterUrl.removeAttribute("href");
  }

  if (data.company) {
    company.textContent = data.company;
    const companyLink = data.company.slice(1);
    company.href = `https://github.com/${companyLink}`;
    company.style.opacity = 1;
  } else {
    company.textContent = "Not Available";
    company.style.opacity = 0.5;
    company.removeAttribute("href");
  }
};

const getUser = async function (username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const errMsg = document.querySelector(".form__error-msg");
    if (!res.ok) {
      errMsg.style.display = "block";
      throw new Error("No results");
    }

    errMsg.style.display = "none";

    const data = await res.json();
    renderUser(data);
  } catch (err) {
    console.error(err.message);
  }
};

const themeBtn = document.querySelector(".header__theme-btn");

function getCurrentTheme() {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  localStorage.getItem("devfinder")
    ? (theme = localStorage.getItem("devfinder"))
    : null;
  return theme;
}

function loadTheme(theme) {
  const root = document.documentElement;
  const headerToggle = document.querySelector(".header__toogle");
  themeBtn.setAttribute("aria-checked", theme === "dark" ? "true" : "false");

  if (theme === "light") {
    themeBtn.innerHTML = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z" fill="#697C9A" class='sun' fill-rule="nonzero"/></svg>`;
    headerToggle.textContent = "Dark";
  } else {
    themeBtn.innerHTML = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" class='moon' fill-rule="nonzero"><path d="M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z"/></g></svg>`;
    headerToggle.textContent = "Light";
  }

  root.setAttribute("color-scheme", `${theme}`);
}

themeBtn.addEventListener("click", () => {
  const headerToogle = document.querySelector(".header__toogle");
  let theme = getCurrentTheme();
  let audio;

  if (theme === "dark") {
    audio = document.querySelector(".theme-audio--light-on");
    theme = "light";
    headerToogle.textContent = "Dark";
  } else {
    audio = document.querySelector(".theme-audio--light-off");
    theme = "dark";
    headerToogle.textContent = "Light";
  }

  audio.currentTime = 0;
  audio.play();
  localStorage.setItem("devfinder", `${theme}`);
  themeBtn.setAttribute("aria-checked", theme === "dark" ? "true" : "false");
  loadTheme(theme);
});

window.addEventListener("DOMContentLoaded", () => {
  loadTheme(getCurrentTheme());
});
