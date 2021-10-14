import * as pulumi from "@pulumi/pulumi";
import * as github from "@pulumi/github";
import * as random from "@pulumi/random";

const secret = new random.RandomString("secret", {
    length: 15
});
const orgSecret = new github.ActionsOrganizationSecret("orgSecret", {
    plaintextValue: secret.result,
    secretName: "mysecret",
    visibility: "selected"
}, { deleteBeforeReplace: true });

const repo1 = new github.Repository("repo1", {
    visibility: "public"
})

const orgSecretRepo = new github.ActionsOrganizationSecretRepositories("orgsecretrepo", {
    secretName: orgSecret.secretName,
    selectedRepositoryIds: [repo1.repoId]
})
