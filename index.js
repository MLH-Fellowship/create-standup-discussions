const core = require("@actions/core");
const github = require("@actions/github");
const moment = require("moment");
const { promises: fs } = require("fs");

function listToArray(list) {
  if (!list) return [];
  return Array.isArray(list) ? list : list.split(", ");
}

const main = async () => {
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
  const template = core.getInput("filename") || "./.github/STANDUP_TEMPLATE.md";
  const organization = core.getInput("organization", { required: true });
  const teams = listToArray(core.getInput("team_slugs", { required: true }));

  core.debug(`Reading template file: ${template}`);
  const content = await fs.readFile(template, "utf8");

  const createDiscussion = async team => {
    const date = moment().format("dddd, MMMM Do, YYYY");
    const discussion = await octokit.teams.createDiscussionInOrg({
      org: organization,
      team_slug: team,
      title: `Standup (${date})`,
      body: content
    });

    core.debug(`Created discussion ${discussion}`);

    return discussion.data.html_url;
  };

  core.debug(`Creating discussions for teams: ${teams}`);
  const urls = await Promise.all(teams.map(team => createDiscussion(team)));

  core.debug(`Created discussions: ${urls}`);
  core.setOutput("urls", urls);
};

main().catch(err => core.setFailed(err.message));
