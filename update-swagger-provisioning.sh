node update-swagger-provisioning.js;

# # Unzip typescript-angular-client-generated.zip
unzip -o typescript-angular-client-generated.zip -d typescript-angular-client-generated;

# # Move to folder
rm -rf src/app/auto-generated/provisioning/;
mv typescript-angular-client-generated src/app/auto-generated/provisioning

# # Remove unused files
git checkout src/app/auto-generated/provisioning/encoder.ts;

rm typescript-angular-client-generated.zip;