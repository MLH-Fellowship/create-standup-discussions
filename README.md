# create-standup-discussions

This GitHub Action can be used to create a standup discussion for teams within a 
GitHub Organization. Using the `schedule` event, you can trigger this daily,
weekly, or on whatever schedule makes sense for your teams.

## Setup

### Create a Personal Access Token

In order to create discussions for the teams in your organization, you'll need a
GitHub API key with the `write:discussion` permission. You need to make this
personal access token available as `GITHUB_TOKEN` in the environment. **Keep in
mind that the default Action token does not have this permission and that
environment variables prefixed with `GITHUB_` are reserved for official GitHub
use only.**

### Create a Standup Template

Finally you'll need to create a standup template markdown file as
`.github/STANDUP_TEMPLATE.md` that will be used to create the discussions. Below
is the recommended default contents. You can customize this by setting the 
`filename` input.

````markdown
Share your daily standup update here. Respond to this discussion before your
standup starts in the following format:

```
**Yesterday**:
 - 

**Today**:
 - 

**Blockers**:
 - 
```
````

## Usage

```
name: Create Daily Standup Discussions

on:
  schedule:
    - cron:  '1 0 * * 1-5' # Runs M-F at 12:01am UTC

jobs:
  create_discussions:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: MLH-Fellowship/create-standup-discussions@v1.x
        env:
          GITHUB_TOKEN: ${{ secrets.GH_ORGANIZATION_TOKEN }}
        with:
          organization: "MLH-Fellowship"
          team_slugs: "team-1, team-2"
```


## License

```
Copyright 2020 Major League Hacking PBC Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
