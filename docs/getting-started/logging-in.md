# Logging into CCAST

*How to login to CCAST HPC clusters*

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Logging into CCAST](https://kb.ndsu.edu/it/130346). Formatting (headings, code blocks, tables, images) needs review before publishing.

## Overview

This document describes how to login to CCAST using several different methods. CCAST has two HPC
[clusters:  Thunder](https://kb.ndsu.edu/128285) [and Thunder Prime](https://kb.ndsu.edu/128284) . For
quick reference, URLs and access methods for each are listed below.
Web browser: https://ondemand.ccast.ndsu.edu (both clusters)
Secure Shell (SSH):
Thunder: ssh username@thunder.ccast.ndsu.edu
Thunder Prime: ssh username@prime.ccast.ndsu.edu
Detailed instructions for each method are discussed below.

## Web Browser (OnDemand)

CCAST provides a web interface to the Thunder and Thunder Prime clusters called OnDemand
<https://openondemand.org> , which allows users to browse files, submit jobs, and launch interactive
applications through a web browser. To access OnDemand, navigate to https://ondemand.ccast.ndsu.edu
<https://ondemand.ccast.ndsu.edu> . If not already logged in, you will be prompted to enter your Bison Login
to gain access.
Once logged in, you will be presented with the dashboard. To start an interactive terminal on an HPC
cluster, select "Clusters" in the navigation bar and "Thunder Shell Access" or Thunder Prime Shell Access",
depending on which cluster you are working with.

## SSH (Command Line)

Built-in Terminal (Windows,Mac, and Linux)
Windows, MacOS, and Linux operating systems all include some type of integrated terminal or command
line application. To login to CCAST from one of these systems:
1. Open the appropriate terminal application for your operating system.
Windows: PowerShell
Mac and Linux: Terminal
2. Run the SSH command using the URL for the cluster you want to login to. Your username will be
your NDSU first.last ID.
Thunder: ssh username@thunder.ccast.ndsu.edu
Thunder Prime: ssh username@prime.ccast.ndsu.edu
3. Enter your NDSU password when prompted. Note: Nothing will appear when you type in the
password prompt. This is normal.
An example screenshot of logging into the Thunder Prime cluster from a Linux system is shown below.

## PuTTY (Windows)

[PuTTY](https://www.putty.org/) is a popular legacy SSH client for Windows. Prior to the release of the
integrated SSH client in PowerShell, PuTTY was the preferred application for logging into CCAST. Some
users may still prefer PuTTY over the integrated SSH client.
PuTTY can be downloaded from the Windows Store
<https://apps.microsoft.com/store/detail/putty/XPFNZKSKLBP7RJ> , or by running the following winget
<https://learn.microsoft.com/en-us/windows/package-manager/winget/> command in PowerShell.
> winget install PuTTY
Once installed, you open PuTTY and enter your login credentials, using prime.ccast.ndsu.edu or
thunder.ccast.ndsu.edu as the hostname, port 22, and SSH as the connection type. Then click "Open" and, if
the connection is successful, you will be prompted for your NDSU username and password.

## See Also

[CCAST User Guide](https://kb.ndsu.edu/page.php?id=107680)
Keywords:
CCAST how-to tutorial putty ondemand ssh log in login help
Suggest keywords
Doc ID: 130346
Owned by: Nick D. in NDSU IT Knowledge Base
Created: 2023-08-15
Updated: 2023-12-18
Sites: NDSU IT Knowledge Base
Clean URL: https://kb.ndsu.edu/it/logging-into-ccast
[Helpful 3 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=130346)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=130346)
