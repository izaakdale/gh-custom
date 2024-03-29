const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  // 1. get input values
  const bucket = core.getInput('bucket', { required: true });
  const region = core.getInput('region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  // 2 upload files
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${region}`);

  const websiteURL = `http://${bucket}.s3-website.${region}.amazonaws.com`;
  http: core.setOutput('website-url', websiteURL);
}

run();
