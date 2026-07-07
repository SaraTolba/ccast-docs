# Installing R Packages in your Home Directory

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Installing R Packages in your Home Directory](https://kb.ndsu.edu/it/101959). Formatting (headings, code blocks, tables, images) needs review before publishing.

This document describes how CCAST users can install third-party packages and libraries for the R language in their home directories.
R is a popular language for statistical programming and has many packages available for different types of analyses. Users are often interested
in how to install some of these packages in their home directories. The steps below describe how to do this.
Note: Lines beginning with $ indicate shell commands. You may type these manually, or copy/paste them from this document. Either way, do
not include the $ when executing commands. Text below commands indicates expected output.
Load the R module. Note: You will have to do this every time you want to work with R on CCAST.
          On Thunder:
```bash
$ module load R/3.5.1
```

          On Thunder Prime:
```bash
$ module load r/4.0.3-gcc-kvvb
```

Start the R interpreter.
```bash
$ R
```

R version 3.5.1 (2018-07-02) -- "Feather Spray"
Copyright (C) 2018 The R Foundation for Statistical Computing
Platform: x86_64-pc-linux-gnu (64-bit)
R is free software and comes with ABSOLUTELY NO WARRANTY.
You are welcome to redistribute it under certain conditions.
Type 'license()' or 'licence()' for distribution details.
Natural language support but running in an English locale
R is a collaborative project with many contributors.

## Type 'contributors()' for more information and

'citation()' on how to cite R or R packages in publications.
Type 'demo()' for some demos, 'help()' for on-line help, or
'help.start()' for an HTML browser interface to help.
Type 'q()' to quit R.
>
To install a package, use the install.packages() command. As an example, we will install the MASS package. The first time you do this, R will ask
you if you would like to use a personal library. Answer “yes” to this question, and the subsequent question about creating a personal library
(bolded in the output below).
> install.packages(“MASS”)
Warning in install.packages("MASS") :
  'lib = "/gpfs1/apps/global/opt/R/v3.5.1/lib64/R/library"' is not writable
Would you like to use a personal library instead? (yes/No/cancel) yes
Would you like to create a personal library
‘~/R/x86_64-pc-linux-gnu-library/3.5’
to install packages into? (yes/No/cancel) yes
Then, R will ask you to choose a download mirror. This is just the location where you want to download the package from. Pick one of the
mirrors in the US, such as mirror 59.
--- Please select a CRAN mirror for use in this session ---
Secure CRAN mirrors
[...]
57: UK (London 1) [https]            58: USA (CA 1) [https]
59: USA (IA) [https]                 60: USA (KS) [https]
61: USA (MI 1) [https]               62: USA (MI 2) [https]
63: USA (OR) [https]                 64: USA (TN) [https]
65: USA (TX 1) [https]               66: Uruguay [https]
67: (other mirrors)
Selection: 59
R will then proceed to download and install the package.
trying URL 'https://mirror.las.iastate.edu/CRAN/src/contrib/MASS_7.3-51.4.tar.gz'
Content type 'application/x-gzip' length 487233 bytes (475 KB)
==================================================
downloaded 475 KB
* installing *source* package ‘MASS’ ...
** package ‘MASS’ successfully unpacked and MD5 sums checked
** libs
/gpfs1/apps/centos7/opt/spack/linux-rhel7-x86_64/gcc-4.8.5/gcc-7.3.0-xegsmw4io2dcncdni4rqhfmhuzljcg3l/bin/gcc -
I"/global/opt/R/v3.5.1/lib64/R/include" -DNDEBUG   -I/usr/local/include   -fpic  -I/global/opt/R/packages-rhel7/include  -c MASS.c -o
MASS.o
/gpfs1/apps/centos7/opt/spack/linux-rhel7-x86_64/gcc-4.8.5/gcc-7.3.0-xegsmw4io2dcncdni4rqhfmhuzljcg3l/bin/gcc -
I"/global/opt/R/v3.5.1/lib64/R/include" -DNDEBUG   -I/usr/local/include   -fpic  -I/global/opt/R/packages-rhel7/include  -c lqs.c -o
lqs.o
/gpfs1/apps/centos7/opt/spack/linux-rhel7-x86_64/gcc-4.8.5/gcc-7.3.0-xegsmw4io2dcncdni4rqhfmhuzljcg3l/bin/gcc -shared -
L/global/opt/R/v3.5.1/lib64/R/lib -L/global/opt/R/packages-rhel7/lib -lcurl -o MASS.so MASS.o lqs.o -L/global/opt/R/v3.5.1/lib64/R/lib -
lR
installing to /gpfs1/home/ndsu.ndusek/R/x86_64-pc-linux-gnu-library/3.5/MASS/libs
** R
** data
*** moving datasets to lazyload DB
** inst
** byte-compile and prepare package for lazy loading
** help
*** installing help indices
** building package indices
** testing if installed package can be loaded
* DONE (MASS)
The downloaded source packages are in
‘/tmp/Rtmp0RcVfV/downloaded_packages’
To make sure our package installed successfully, we should try loading it.
> require(“MASS”)
Loading required package: MASS
To exit the R interpreter, run the quit() command. You do not have to save the environment for your packages to stay installed.
> quit()
ave workspace image? [y/n/c]: n
Now every time you load the R module, either in the shell or in a job script, your package will be available for you to use.
Keywords:

## CCAST, R, install packages, home directory

Suggest keywords
Doc ID: 101959
Owned by: Nick D. in NDSU IT Knowledge Base
Created: 2020-05-11
Updated: 2025-05-29
Sites: NDSU IT Knowledge Base
[Helpful 1 Unhelpful 1 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=101959)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=101959)
