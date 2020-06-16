---
layout: post.njk
title:  'GitHub CLI: create and manage PRs from the command line'
date:   2020-04-12
---

Recently released in beta, [GitHub CLI](https://cli.github.com/) managed to integrate seamlessly in my workflow, like it’s always been there. As [oh-my-zsh’s git aliases](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git), they quickly became muscle memory.

Of course, there are two kinds of programmers: those who use a [desktop client for git](https://desktop.github.com/), and those who don’t[^1]. Vim being my editor of choice, you can probably guess which camp I’m in. Hearing that GitHub have released a tool _just for me_ was music to my ears.

### What is it for?

Mainly for managing pull requests and issues directly from the command line.

### How to get it

`brew install github/gh/gh`

## Chechking PRs for code reviews: `gh pr view` and `gh pr checkout`

For a little bit of context, as a frontend developer, I like to always run pull requests locally, to make sure what I review works and looks fine (sure, QA can do that too, but let them catch the bugs that aren’t obvious.) So, reviewing a pull request involves reading the changes, checking out the branch, and running locally.

In a browser-based workflow, this looks something like the following:
- copy the branch name from github.com/org/repo/pull/123
- `git checkout the-pr-branch`
- oh, I forgot to pull, it’s not there yet. `git pull`
- `git checkout the-pr-branch`
- run code.

The same using the cli:
- `gh pr list`
- `gh pr checkout 123`
- run code.

That’s my kind of workflow! ⚡️

#### This is what happens in a bit more detail:

```sh
$ gh pr list

Pull requests for some-org/some-repo

#123  Add some great feature  feat/cool-feature
#124  Fix nasty bug           fix/nasty-bug
```

`gh pr list` shows me all the open pull requests in the current repo. All I need to do is choose which one I’m interested in.

Now comes the best part: `checkout` switches to the PR’s branch based on PR number.

```sh
$ gh pr checkout 123

Switched to branch feat/cool-feature
Your branch is up-to-date with origin/feat/cool-feature.
```

I can also open the PR on github.com right from the terminal (it opens the browser automatically):
```sh
$ gh pr view 123

Opening https://github.com/some-org/some-repo/pull/123 in your browser.
```

## Opening pull requests: `gh pr create`
```sh
$ gh pr create

Creating pull request for feat/cool-feature into master in some-org/some-repo
? Title ▌
```

After filling title and body (the latter using your system editor[^2]), it will give you the option to preview, submit or cancle the pull request. Depending on the task, I usually preview and request reviews, but sometimes just submit.

```sh
$ gh pr create

Creating pull request for feat/cool-feature into master in some-org/some-repo
? Title Fix nasty bug
? Body <Received>
? What's next?  [Use arrows to move, type to filter]
> Preview in browser
  Submit
  Cancel
```

You can also open a [draft pull request](https://github.blog/2019-02-14-introducing-draft-pull-requests/) by passing the `--draft` (or `-d`) flag: `gh pr create -d`.

## Useful for checks: `gh pr status`

You can check the overall PR status of a branch with `gh pr status`. This is not an overview though; it is branch-specific. So for the following output, you have to be on the same branch as the PR:

```sh
$ gh pr status

Current branch
  #123  Add cool feature
    - Checks passing
  #124  Fix nasty bug
    - Checks passing

Created by you
  You have no open pull requests

Requesting a code review from you
  #123  Add cool feature
    - Checks passing - Review required
```

## Issues etc.

You can list, view (open in browser) and open issues with the respective commands `gh issue list`, `gh issue view 10`, and `gh issue create`. They work very similarly to `pr`s.

And, just as I was checking the docs to fact-check what I’m writing, I’ve discovered [you can create a repo](https://cli.github.com/manual/gh_repo) with `gh repo create some-org/another-repo`. Not something I do on a daily basis, but I might even get to using it! On the other hand, `gh repo clone some-org/some-other-repo` is a much friendlier experience than either remembering the whole .git repo url syntax or visiting the repo and clicking clone. 

## Overall? Lgtm.

GitHub CLI is a simple, easy-to-use tool that’s also easy to love.

[Be sure to check out the docs](https://cli.github.com/manual/), as there are a lot of useful options. Happy coding! 🎉

---

#### Notes

[^1]: I admit this may be a very personal choice, and I have an opinionated… opinion. That is, to understand git properly, and solve more complex issues, it’s better to use the command line. As the [desktop repo states](https://github.com/desktop/desktop/blob/development/docs/process/what-is-desktop.md#1-github-desktop-reduces-frustration-and-makes-git-and-github-workflows-more-approachable), _“GitHub Desktop is not a replacement for the functionality of Git, but a tool to enable you and your team to be more productive.”_
[^2]: You can set this in `~/.bashrc` or `~/.bash_profile` or `~/.zshrc`, whichever you use, by adding `export EDITOR=vim` (or any other editor you like.)
