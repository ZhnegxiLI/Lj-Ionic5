# Migration from IONIC 3 to IONIC 6
- Guard to verfify access permission 
- Add http interceptor to add JWT and error handler
- JPUSH
- caching api request
- Create date component 
## TODO: 
- Reformat the http error handler 
- Refactoring validation order page 
- 3 page rest: product model, sals order(rename at last)
- add infinite scroll for mat-select component https://www.npmjs.com/package/ng-mat-select-infinite-scroll 

# Build projet 
-  ionic capacitor copy [options]
Inputs​: platform(android/ios)
Options: --prod , --configuration =<conf>

# Deploiment: 
- If you want to launch it on UAT(Staging), commit your change then review it on github action
- If you want to deploy it on Prod, just create a new tag then the prod release will automatically launch
