# Running Gromacs on CCAST Clusters

*Detailing the basic usage of the GROMACS package software on CCAST*

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Running Gromacs on CCAST Clusters](https://kb.ndsu.edu/it/130426). Formatting (headings, code blocks, tables, images) needs review before publishing.

## Introduction

This document describes basic usage of GROMACS on CCAST clusters. Far more information about
GROMACS is available in the GROMACS manual, which is available online
<https://manual.gromacs.org/current/index.html> and is maintained by the GROMACS developers.
[GROMACS](https://gromacs.org) is a free and open-source high-performance molecular dynamics
package, mainly designed for simulations of proteins, lipids, and nucleic acids, but it is also used in
simulation of drug design and polymers. On CCAST, GROMACS can be run on Thunder Prime
<https://kb.ndsu.edu/128284> using both CPU and/or GPU via the gromacs/2025.3 module, that can be loaded
as follows:
```bash
$ module load gromacs/2025.3
```

The main executable for GROMACS is gmx. The gmx command can be used to run a variety of different tasks,
including energy minimization, molecular dynamics, and analysis of output. This command requires
```bash
mpirun to be used.
```

## Running an Example Job

Example GROMACS job scripts are available in /mmfs1/projects/ccastest/examples/GROMACS_examples/. The
example script that uses GPU acceleration is job_gpu.pbs while the CPU-only script is job_cpu.pbs. Both
jobs take the input.tpr file as input, which specifies a steepest descent energy minimization of the
lysozyme protein in water (taken from a [much more detailed GROMACS Tutorial](https://events.praceri.eu/event/455/attachments/369/553/MD_Lysozyme.pdf) by Justin A. Lemkul, PhD). The provided GROMACS
example PBS scripts can be copied to your scratch directory and modified to suit your own needs.

## Reading the Input File

Copy the GROMACS_examples directory to your scratch directory.
```bash
$ cp -r /mmfs1/projects/ccastest/examples/GROMACS_example $SCRATCH/
$ cd $SCRATCH/GROMACS_examples/GROMACS_example
```

You can view the contents of the input.tpr file, use the gmx dump command as follows:
```bash
$ gmx dump -s input.tpr | less
```

Submitting mdrunJobs
To run the job, use the qsub command as follows:
```bash
$ qsub job_cpu.pbs
```

The same job can also be run on the GPU-accelerated nodes by using the job_gpu.pbs script instead.
```bash
$ qsub job_gpu.pbs
```

The job will take a few moments to run.

## Working with GROMACS output files

Once it is complete, you can view the output files. The gmx energy command can be used to read the
ener.edr file created.
```bash
$ gmx energy -f ener.edr -o potential.xvg
```

Opened ./ener.edr as single precision energy file
Select the terms you want from the following list by
selecting either (part of) the name or the number or a combination.
End your selection with an empty line or a zero.
-------------------------------------------------------------------
1 Bond        2 Angle        3 Proper-Dih. 4 Ryckaert-Bell.
5 LJ-14        6 Coulomb-14  7 LJ-(SR)     8 Coulomb-(SR)
9 Coul.-recip. 10 Potential   11 Pressure    12 Vir-XX
13 Vir-XY      14 Vir-XZ     15 Vir-YX     16 Vir-YY
17 Vir-YZ      18 Vir-ZX     19 Vir-ZY     20 Vir-ZZ
21 Pres-XX      22 Pres-XY     23 Pres-XZ    24 Pres-YX
25 Pres-YY     26 Pres-YZ     27 Pres-ZX   28 Pres-ZY
29 Pres-ZZ     30 #Surf*SurfTen 31 T-rest
> 10 0
Here, we select Potential, which is term 10. The output is written to potential.xvg, which contains tabular
data of the potential energy over the minimization.
Visualizations of the output can be produced on CCAST using the GUI software VMD
<https://www.ks.uiuc.edu/Research/vmd/> which is available on CCAST by logging into the OnDemand
<https://https://ondemand.ccast.ndsu.edu/> system through a web browser.
Keywords:
GROMACS, molecular dynamics, simulation, tutorial, how to, chemistry
Suggest keywords
Doc ID: 130426
Owned by: Stephen S. in NDSU IT Knowledge Base
Created: 2023-08-17
Updated: 2025-10-06
Sites: NDSU IT Knowledge Base
[Helpful 0 Unhelpful 3 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=130426)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=130426)
