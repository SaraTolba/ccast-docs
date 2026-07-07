# Running LAMMPS on CCAST Clusters

*Basic usage of LAMMPS, Large-scale Atomic/Molecular Massively Parallel Simulator, on CCAST Clusters*

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Running LAMMPS on CCAST Clusters](https://kb.ndsu.edu/it/132064). Formatting (headings, code blocks, tables, images) needs review before publishing.

## Introduction

This document describes basic usage of LAMMPS on CCAST clusters. Far more information is available on
[the project website](https://lammps.org) including the LAMMPS manual
<https://docs.lammps.org/Manual.html> . Additional help is available on the official LAMMPS forum
<https://matsci.org/> .
LAMMPS is the Large-scale Atomic/Molecular Massively Parallel Simulator. It is a classical molecular
dynamics software that focuses on materials modeling, including coarse-graining and reactive force field
calculations, and is free and open-source software.
While this document describes basic usage of LAMMPS on CCAST clusters, it is not intended to be a
comprehensive guide to LAMMPS, but rather a quick reference for the software on CCAST clusters. For
more information, a number of resources are provided by the LAMMPS developers including:
[The LAMMPS Website](https://www.lammps.org/)
[The LAMMPS Documentation](https://docs.lammps.org/)
The Official LAMMPS [forum at Materials Community Discourse](https://matsci.org/c/lammps/40)
Creating Input Files
For LAMMPS to run a simulation, it needs an input file. This file contains all the information about the
simulation, including the type of simulation, the potential(s), the initial configuration, and the style of
output. The input file is a text file, and can be created using any text editor. The LAMMPS manual has a
[section](https://docs.lammps.org/Commands_structure.html) on how to create input files.
Many people use a number of pre-processing tools for building initial input files. These include Packmol
<[http://m3g.iqm.unicamp.br/packmol/home.shtml> , VMD](https://www.ks.uiuc.edu/Research/vmd/) , and
[moltemplate](https://moltemplate.org) for creating initial geometries. In addition, there are a number of
tools for creating input files for specific types of simulations. An extensive list of these is available here.
<https://www.lammps.org/prepost.html>
Simulations require parameters to be set. For atomistic systems, the parameters of the potential are set in
the input file, and these potentials are derived either experimentally through techniques such as NMR, or
through the optimization of a structure by quantum chemical methods. The Automated Topology
[Builder](https://atb.uq.edu.au/index.py?tab=about) provides a way to create potential parameters for new
molecular structures.

## Running LAMMPS on CCAST

LAMMPS is available on both the Thunder and Prime clusters as modules, and can either be optimized for
CPU or GPU execution. To load LAMMPS on Thunder, use the following commands in your PBS scripts:
```bash
$ module load intel/2018.2.046
$ module load lammps/20180222-gcc
```

Installed packages for the Thunder version of LAMMPS are:
ASPHERE BODY CLASS2 COLLOID DIPOLE GRANULAR KSPACE MANYBODY MC MISC MOLECULE
PERI REPLICA RIGID SHOCK SNAP SRD OPT CORESHELL QEQ
On Prime, the latest version of LAMMPS is available as a single module that supports both CPU and GPU
execution. You can load the module as follows:
```bash
$ module load lammps/22Jul2025
```

# show the help message for the executable
```bash
$ lmp -h
```

The module is compiled with the following packages:
AMOEBA ASPHERE BOCS BODY BPM BROWNIAN CG-DNA CG-SPICA CLASS2 COLLOID COLVARS
COMPRESS CORESHELL DIELECTRIC DIFFRACTION DIPOLE DPD-BASIC DPD-MESO DPD-REACT
DPD-SMOOTH DRUDE EFF ELECTRODE EXTRA-COMPUTE EXTRA-DUMP EXTRA-FIX
EXTRA-MOLECULE EXTRA-PAIR FEP GPU GRANULAR INTERLAYER KOKKOS KSPACE LEPTON
MACHDYN MANYBODY MC MEAM MESONT MISC ML-IAP ML-POD ML-SNAP MOFFF MOLECULE
OPENMP OPT ORIENT PERI PHONON PLUGIN POEMS QEQ REACTION REAXFF REPLICA RIGID
SHOCK SPH SPIN SRD TALLY UEF YAFF
Running LAMMPS on Prime
CPU example
Example simulation files are available in the /mmfs1/projects/ccastest/examples directory. These include a
number of LAMMPS input examples.
For example, to run Example_22Jul2025 you would do the following:
```bash
$ cp -R /mmfs1/projects/ccastest/examples/LAMMPS_22Jul2025_example .
$ cd LAMMPS_22Jul2025_example
```

This will copy the example directory to your current working directory. The file job.pbs contains a PBS
script which loads the targeted LAMMPS module:
```bash
module load lammps/22Jul2025
```

You will need to modify the job.pbs file to include your group name in the #PBS -W group_list= line, the
input file name, and the resources selection line:
```bash
#PBS -l select=1:mem=5gb:ncpus=4:mpiprocs=4:ompthreads=1
```

Once this is done, you can submit the job to the queue using the qsub command:
```bash
$ qsub job.pbs
```

GPU example
For the GPU version, you will need to modify the job.pbs file, changing the queue to gpus:
```bash
#PBS -q gpus
```

In addition, you will need to modify the job.pbs file to include the number of GPUs you want to use in the
```bash
#PBS -l gpus= line. For example, to use 1 GPU, you would change the line to:
#PBS -l select=1:mem=5gb:ncpus=4:mpiprocs=4:ompthreads=1:ngpus=1
```

Once this is done, you can submit the job to the queue using the qsub command:
```bash
$ qsub job.pbs
```

Working with outputfiles
LAMMPS produces a number of output files. The most important of these is the log file, which contains
information about the simulation, including the number of steps, the energy, and the temperature. The
log file is specified in the input file using the log command, and can be analyzed with a number of free
[and open source tools](https://docs.lammps.org/Tools.html) , including VMD, which is available on CCAST
[OnDemand](https://kb.ndsu.edu/130346) .

## Parallel Scaling Performance

LAMMPS has a parallel codebase, and can be run on multiple cores and nodes. The performance of
LAMMPS is dependent on the number of cores and nodes used, and the type of simulation. Here, the
same workload, consisting of 19,652 simulated particles, was tested 10 times using different amounts and
types of hardware on the Prime cluster to show the results with CPU or GPU parallel scaling.

## CPU Scaling

The following tables shows the result of running the same simulation on CPU only:

## Cores Timestep / sSpeedupEfficiency

1 36.77 1.00 1.00
4 127.80 3.47 0.87
6 166.22 4.52 0.75
8 200.17 5.44 0.68
16 319.20 8.68 0.54
32 352.24 9.58 0.30
CPU scaling with number of cores
GPU Scaling
For comparison, the timesteps per second for GPU largely depended on the card used for calculation. The
following runs used 4 CPU cores and 1 GPU card, with speedup over the CPU-only run:

## GPU Timestep / sSpeedup

a10 1384.12 10.83
a40 1672.25 13.08
a100 3656.17 28.84
GPU scaling with card type
Keywords:
LAMMPS, Molecular Dynamics, MD, Simulation, How-to, Tutorial, CCAST, HPC, Physics, Chemistry
Suggest keywords
Doc ID: 132064
Owned by: Stephen S. in NDSU IT Knowledge Base
Created: 2023-10-12
Updated: 2025-08-26
Sites: NDSU IT Knowledge Base
[Helpful 0 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=132064)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=132064)
