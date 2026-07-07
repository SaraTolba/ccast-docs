# Data ManagementforCCAST Users

*Key information and best practices for storing, transferring, and managing data on CCAST systems*

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Data ManagementforCCAST Users](https://kb.ndsu.edu/it/136595). Formatting (headings, code blocks, tables, images) needs review before publishing.

## Introduction

This document is intended to provide an overview of data management on CCAST systems, including data
storage locations and quotas, data transfer tools, and best practices for managing data.

## Data storage

There are three primary locations where users can store data on CCAST systems: home, scratch, and
projects. Each location has a different purpose and a different limit (quota) on how much data can be
stored there.
The home directory is intended for personal storage and has a quota of 200 GB. Each user has their own
home directory where they can store source code, scripts, and small data files. Home directories are
backed up nightly, making them a safe location to store data long-term.
The scratch directory is high-speed storage intended for temporary files related to active computations,
and has a quota of 20 TB. Each user has their own scratch directory. Data stored in scratch is NOT backed
up, and files in scratch older than 60 days are deleted automatically to maintain performance and
availability.
Project directories are intended for long-term storage of data, are backed up regularly, and have a default
quota of 5TB. A project directory is shared among all users in the owner's project group, and is therefore an
ideal place for sharing data within a lab, research group, or other research collaboration.

## Data storage location quick reference

The table below summarizes key information about each of the available storage locations mentioned
above.
Location Path Quota Ownership Backed up?

## Home

Thunder: /mmfs1/thunder/home/<user>
Prime: /mmfs1/home/<user>
200 GB
Private per
user
Yes
Scratch
Thunder: /mmfs1/thunder/scratch/<user>
Prime: /mmfs1/scratch/<user>
20 TB
Private per
user
No
Projects
Thunder: /mmfs1/thunder/projects/<project_owner>
Prime: /mmfs1/projects/<project_owner>
5 TB
Shared
within
project
group
Yes
locations on the shared filesystem
Checking datausage
You can see your data storage quotas and usage at any time by using the lsquota command in the
terminal, or by selecting "Disk Usage" from the "Utilities" menu in the CCAST OnDemand
<https://ondemand.ccast.ndsu.edu/> web portal (see screenshot below).
When a storage quota is exceeded, the user will be unable to write to the directory until the amount of
data stored is brought back under the quota (i.e., through deletion or migrating files to another location).

## Data transfer

There are several tools available for uploading/downloading data to/from CCAST systems. Some of these
are hosted by CCAST and others are third-party tools.

## Support

Transfer tools
CCAST OnDemand
For data transfers less than 10 GB, files can be uploaded and downloaded using the CCAST OnDemand
<https://ondemand.ccast.ndsu.edu/> web portal. Upload and download buttons are available from any
storage location in the "Files" menu (see screenshot below).

## Globus

[Globus](https://globus.org) is a data transfer service designed for high-performance, reliable, and secure
data transfer. For CCAST users, Globus provides a convenient way to transfer data between CCAST storage
locations, external storage systems, and other research institutions. Globus is especially well-suited for
transferring large datasets. For detailed instructions on how to use Globus on CCAST, please see the
[Globus KB article](https://kb.ndsu.edu/121457) .

## SCP

[SCP](https://linux.die.net/man/1/scp) (Secure Copy Protocol) is a command-line tool for securely
transferring files between a local host and a remote host or between two remote hosts. SCP uses the SSH
protocol for data transfer, providing encryption and authentication mechanisms to ensure data security.
SCP is widely used for transferring files across networks generally, and is supported by Windows and most
Unix-like operating systems.
For example, to copy a file from a local computer to CCAST Prime, the following command can be used:
# A windows example
> scp C:\path\to\file.txt <user>@prime.ccast.ndsu.edu:/path/to/destination
# A unix-like example (Linux, MacOS)
```bash
$ scp /path/to/file.txt <user>@prime.ccast.ndsu.edu:/path/to/destination
```

The -r flag performs SCP recursively, allowing for entire directories to be copied. For instance, moving a
directory from CCAST to a local computer:
# Moving the directory to the current working directory
```bash
$ scp -r <user>@prime.ccast.ndsu.edu:/path/to/directory/ /path/to/destination
```

WinSCP
[WinSCP](https://winscp.net/eng/index.php) is a desktop application for Windows that allows users to
interact with remote host systems using a more familiar drag-and-drop interface. After logging into CCAST
via WinSCP, users will see a split-pane file explorer with their local computer on one side and CCAST on the
other (see screenshot below).

## Rsync

[Rsync](https://linux.die.net/man/1/rsync) is a command-line tool for efficiently transferring and
synchronizing files, and has the ability to resume interrupted transfers. Rsync is widely used and is
supported by most Unix-like operating systems, and is especially useful for transferring large datasets or
for incremental backups.
For example, to copy a file from a local computer to CCAST Prime, the following command can be used:
```bash
$ rsync -avz /path/to/local/file.txt <user>@prime.ccast.ndsu.edu:/path/to/remote/destination
```

Here, the -a flag preserves file permissions and ownership, the -v flag enables verbose output, and the -z
flag compresses data during transfer.

## Support

Partial transfers can be resumed by adding the --partial flag to the rsync command, and the -r flag
performs operations recursively. For example:
# Resume a partial transfer
```bash
$ rsync -avzP /path/to/local/directory <user>@prime.ccast.ndsu.edu:/path/to/remote/destination
```

Another useful set of flags is -bu, which will produce a backup and update files only if the source file is
newer than the destination file:
# Backup and update files
```bash
$ rsync -bruvz /path/to/local/directory <user>@prime.ccast.ndsu.edu:/path/to/remote/destination
```

Data management
Data management is a broad topic, so here, we focus specifically on best practices for managing data
stored on CCAST systems.

## Where to store different kinds of data

The different storage locations on CCAST are intended for different purposes.
User home directories are private to each user and have a limited amount of storage space. As such, they
are ideal for storing relatively small data that users want to remain private. Types of data that are ideal for
storing in the home directory include scripts, code files, custom software (e.g. Python or R packages,
executables downloaded or built from source), and small test data sets. Home directories are not ideal for
large data or data that you want to be shared with other users on CCAST.
User scratch directories are also private, but have the capacity to store much larger quantities of data.
However, scratch directories are not backed up, and files older than 60 days which are not actively being
used may be deleted to maintain the space of the system. For these reasons, scratch is ideal for storing
large quantities of temporary or in-process data, data associated with computations, or databases for
testing. Scratch is not ideal for data that you want to store long-term, or for data you want to share with
other users on CCAST.
Project directories can also store larger quantities of data than home directories but are owned by faculty
members and shared with all members of that faculty member's project group.
Like home directories, project directories are backed up and can be used to store long-term data.
Therefore, project directories are ideal for storing datasets, code, software, and other data that cannot fit
in home, and that needs to be accessible by all members of the research group. Project directories should
not be used to store data that users want to remain private, since other group members may be able to
see data in the project directory.

## Tips for facultyproject owners

Faculty project group owners should have their students store research data in their project directory.
There are several benefits to standardizing on this policy:
All data stored in a faculty member's project directory belongs to that faculty member, and will not
be deleted or removed when students and staff depart from the lab. This provides for data access
continuity.
Data stored in user's home directories is private, and faculty should not expect that they will be able
to retrieve such data from one of their students' home directories upon departure. If faculty suspect
important research data is being stored in students' home directories, they should remind them to
move it to the project directory, as recommended above.
Data stored in project directories is accessible by all members of the project group. This makes
project directories ideal for sharing data between different users, especially if they are collaborating
on various projects in the same lab.

## Datamanagement plans for grant proposals

Many grant programs require a data management plan. CCAST is happy to provide letters of support and
facilities descriptions for grant proposals, but cannot write the data management plan itself. If you plan
include CCAST as part of your data management plan, and you anticipate that additional data storage and
management resources will be needed beyond what you currently have access to, please talk with us
before submitting the proposal. This will ensure that appropriate capacity is available in the event that the
proposal is funded. In some cases, additional funds may need to be included in the proposal budget for
the purchase of storage capacity, depending on the needs of the research.
Keywords:
CCAST, hpc, data management, data storage, data transfer mgmt
Suggest keywords
Support
Doc ID: 136595
Owned by: Stephen S. in NDSU IT Knowledge Base
Created: 2024-04-04
Updated: 2026-07-05
Sites: NDSU IT Knowledge Base
Clean URL: https://kb.ndsu.edu/it/ccast-data-mgmt
[Helpful 0 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=136595)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=136595)
Support
