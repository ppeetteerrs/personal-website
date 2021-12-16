---
title: Docker Cheatsheet
date: 2021-12-01
summary: "A cheatsheet for Docker."
categories:
  - cheatsheet
  - programming
tags:
  - linux
  - cli
  - docker
type: post
draft: true
---

# Syntax
```bash
rsync [OPTION] <src>[/] <dest>
```

- `rsync` automatically creates destination directories
- Adding a slash (/) after `<src>` transfers only contents of `<src>`.
- Use `--delete` to remove extraneous files

## Common Options
| flag | description                                                                      |
| ---- | -------------------------------------------------------------------------------- |
| `-a` | archive mode (recursive + preserve symlink, permissions, ownerships, timestamps) |
| `-e` | remote shell                                                                     |
| `-h` | human-readable format                                                            |
| `-n` | dry run                                                                          |
| `-P` | show progress                                                                    |
| `-u` | update (skip files newer on `<dest>`)                                            |
| `-v` | verbose                                                                          |
| `-z` | compress file data (during transfer)                                             |

# Examples
## Local Transfer
```bash
rsync -avhzP <folder1> <folder2>
```

## SSH Transfer
```bash
rsync -avhzP <username>@<host>:<path> <folder2>
```

- `<path>` must be **absolute** (can use `~/...` though)
- use `-e` to specify ssh options (e.g. `-e 'ssh -p 31415'`)

## Other Options
- Exclusion
	- `--exclude <file or folder or pattern>` (use multiple `--exclude` flags or `--exclude {"<pattern1>", "<pattern2>"}`)
	- `--exclude-from <txt_file>` (again can use list syntax)
- Size Limits
	- `--max-size` or `--min-size`: specify size in mb or gb (e.g. `500m`)
- Bandwidth Limits
	- `--bwlimit`: specify in kB or mB/s (e.g. `100K`)



