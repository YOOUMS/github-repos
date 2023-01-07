let repoNameInput = document.querySelector("input");
let getReposButton = document.querySelector('button');
let resultsDiv = document.querySelector('.results');

let repoDetailsDiv = document.createElement("div");
repoDetailsDiv.classList.add('repo-details');

let repoStarsDiv = document.createElement("div");
repoStarsDiv.classList.add('stars-count');

let repoNameDiv = document.createElement('div');
repoNameDiv.classList.add('repo-name');

let visitLink=document.createElement("a");
visitLink.innerHTML="Visit";
visitLink.target="_blank";

const getRepos = async function(){
    let repoName = repoNameInput.value;
    if(repoName==''){
        let span = document.createElement('span');
        let textNode = document.createTextNode("No Reps To Show");
        span.append(textNode);
        resultsDiv.innerHTML=''
        resultsDiv.appendChild(span);
    }else{
        try{
            let fetchDate = await (await fetch(`https://api.github.com/users/${repoName}/repos`)).json();
            resultsDiv.innerHTML='';
            fetchDate.forEach(function(repo){
                
                let repoNameJson = repo["name"];
                let repoStarsJson = repo['stargazers_count'];
                let repoLinkJson = repo['html_url'];
                
                let repoDetailsDivClone = repoDetailsDiv.cloneNode(true);
                let repoNameDivClone =repoNameDiv.cloneNode(true);
                let visitLinkClone=visitLink.cloneNode(true);
                let repoStarsDivClone = repoStarsDiv.cloneNode(true);

                repoNameDivClone.innerHTML=repoNameJson;
                visitLinkClone.setAttribute('href',repoLinkJson);
                repoStarsDivClone.innerHTML=`Stars ${repoStarsJson}`;;

                repoDetailsDivClone.appendChild(repoNameDivClone);
                repoDetailsDivClone.appendChild(visitLinkClone);
                repoDetailsDivClone.appendChild(repoStarsDivClone);

                resultsDiv.appendChild(repoDetailsDivClone);
            })
        }catch(error){
            return error;
        }
    }
}
getRepos();

getReposButton.addEventListener("click",getRepos);