node download-swagger-maquinaria.js;

# Unzip typescript-angular-client-generated.zip
unzip -o typescript-angular-client-generated.zip -d typescript-angular-client-generated;

# Move to folder
rm -rf src/app/typescript-angular-client-generated/;
mv typescript-angular-client-generated src/app/typescript-angular-client-generated;

# Remove unused files
git checkout src/app/typescript-angular-client-generated/encoder.ts;
git checkout src/app/typescript-angular-client-generated/model/problemDetails.ts;

rm typescript-angular-client-generated.zip;

git add src/app/typescript-angular-client-generated/*;
git add swagger.json;
git commit -m "update swagger";
git pull;
git push;