### For deploying to github pages I had a lot of problems getting it to work
### This medium post finally helped me get it to work on 1/24/2020
### https://fireflysemantics.medium.com/deploying-your-angular-application-to-github-pages-3781727779e1
git remote add origin git@github.com:uiuc-mcs/uiuc-mcs.git
ng deploy --base-href=https://uiucmcs.org --cname=uiucmcs.org