# Running Gaussian 16 on CCAST Clusters

*Basic usage of Gaussian16, a quantum chemistry software package*

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Running Gaussian 16 on CCAST Clusters](https://kb.ndsu.edu/it/135576). Formatting (headings, code blocks, tables, images) needs review before publishing.

## Introduction

This document describes the basic usage of Gaussian 16 on CCAST clusters, and is intended as a tutorial
supplement to [the Gaussian 16 User’s Reference](https://gaussian.com/man/) . Gaussian 16 is a widely used
ab initio quantum chemistry software package, and can be used to perform a variety of calculations,
including emission and absorbance spectra, geometric optimization, energy of transition states, and make
predictions on other chemical and physical behavior.
Gaussian 16 is available on the [CCAST clusters on Thunder Prime](https://kb.ndsu.edu/128284) to verified
users under a paid license and under the terms of that license. To receive access to Gaussian 16 on the
CCAST clusters, please email  CCAST Support <mailto:ndsu.ccast.support@ndsu.edu> .
The following example files are found on Thunder Prime in the directory
/mmfs1/projects/ccastest/examples/Gaussian16/ and can be copied to your scratch directory with the
command:
```bash
cp -r /mmfs1/projects/ccastest/examples/Gaussian16/ $SCRATCH
```

Creating Input Files
Creating Atomic Coordinates
Gaussian 16 works on molecular coordinates. For any system of interest, the coordinates can be generated
using a molecular modeling [software package, such as Avogadro](https://two.avogadro.cc/) , GaussView
<[https://gaussian.com/gaussview6/> , or Molden](https://theochem.ru.nl/molden/) . Gaussview 6.1.1 is available
[CCAST users via CCAST OnDemand](https://ondemand.ccast.ndsu.edu/) , and can prepare Gaussian job
script files, in addition to geometries.
[In addition, OpenBabel](https://kb.ndsu.edu/openbabel.org) can be used to generate and force-field
optimize molecular coordinates, and to convert between chemical formats. This can be used on the
command line on CCAST with the openbabel module after loading the openbabel module: $ module load
openbabel. Alternatively, the coordinates of a PDB-formatted system can be converted into a Gaussian
input file using the command [newzmat. See the Gaussian documentation](https://gaussian.com/newzmat/)
for details.

## Gaussian Input File Format

Gaussian 16 uses a plain text file as input, which contains the molecular geometry, basis set, and other
parameters for the calculation. The keywords and the values are case sensitive. The sections of the
Gaussian input format as as follows:
[Link0: The link0](https://gaussian.com/link0/) section specifies machine specific parameters, such
as the number of processors to use, the amount of memory to use, and the checkpoint file name.
Route: This one-line section specifies the type of calculation <https://gaussian.com/capabilities/?
[tabid=1> , model chemistry](https://gaussian.com/capabilities/?tabid=0) , basis set
<[https://gaussian.com/basissets> , functional method](https://gaussian.com/dft/) , and other
parameters.
Title: This one-line section is used to specify the title of the calculation.
Body: This section is used to specify the charge and multiplicity of the molecule, the coordinates of
the system, and optionally the connectivity, specifying bond order, in that order.
In addition, exclamation points can be used to add comments to the input file, and blank lines are
required to separate title and body sections (including a blank line at the end of the coordinates.)
The following is a minimal example of a Gaussian input file, specifying 4 processors and 4 GB of memory,
and performing a Hartree-Fock geometry optimization of a water molecule using the HF/3-21g model
chemistry:

## Support

%nprocshared=4
%mem=4GB
%rwf=water.rwf
%nosave
%chk=water.chk
#opt HF/3-21g
! this is a comment, and it is ignored by Gaussian
water molecule energy and geometry optimization
0 1
O 0.000000 0.000000 0.062600
H -0.792701 0.000000 -0.497300
H 0.792701 0.000000 -0.497300
1 2 3
2 1
3 1
Here, we specify that the calculation should use 4 processors and 4 GB of memory, and that the
checkpoint file should be named water.chk. The calculation is a geometry optimization using the HF/3-21g
model chemistry. The title of the calculation is “water molecule energy and geometry optimization”. The
charge and multiplicity of the water molecule are 0 and 1, respectively. The coordinates of the water
molecule are specified in the body of the input file, and the connectivity is specified at the end of the body.
Note that the input body ends with a blank line. This is required for Gaussian to read the input file
correctly.
As the job is running, the %rwf= directive creates a “Read-Write File” which is used to store temporary data
during the calculation. This file is written to the current working directory, and is used to restart a
calculation from a previous point. Job restart from the checkpoint requires this file to be created. For more
details on job restarts, please [see the related Gaussian documentation](https://gaussian.com/restart/) .
This input body, which contains coordinates, can also be read from a separate XYZ file using the @ symbol.
For example, the above input file could be rewritten, without connectivity data, as:
%nprocshared=4
%mem=4GB
%rwf=water.rwf
%nosave
%chk=water.chk
#opt HF/3-21g
water molecule energy and geometry optimization
0 1
@water.xyz
! water.xyz must be devoid of comments and blank lines
Running Gaussian 16
Single-Node Execution
Gaussian 16 is run using the g16 command, with redirection of both input and output. For the above
example, the command would be:
g16 < water.com > water.log
The output of the calculation is written to the file water.log. A PBS script can be used to submit the
Gaussian job to the queue. The following is an example PBS script:

## Support

```bash
#!/bin/bash
#PBS -q default
#PBS -N water
#PBS -l select=1:ncpus=4:mem=5gb
#PBS -l walltime=00:10:00
```

## replace x-ccast-prj- with your group name
```bash
#PBS -W group_list=x-ccast-prj-
```

## load the Gaussian module
```bash
module load gaussian/16-c02-avx2
```

## input and output file names
INPUT=water.com
OUTPUT=water.log
## change to the directory where the input file is located
```bash
cd $PBS_O_WORKDIR
```

## create a scratch directory for the job
## g16 will use this directory to store temporary files
```bash
export GAUSS_SCRDIR=$SCRATCH/g16.$PBS_JOBID
mkdir -p $GAUSS_SCRDIR
```

## run the Gaussian job
g16 < $INPUT > $OUTPUT
This script is submitted to the queue using the qsub command:
```bash
qsub water.pbs
```

Multi-Node Execution
Gaussian 16 can be run on multiple nodes using the g16 command using Linda, which is a messagepassing library. The following is an example Gaussian input file which provides the %LindaWorkers= directive
in Link0. This section will need to be re-written by our job submission script to contain the correct
compute node names for the job to execute in parallel.
%nprocshared=4
%mem=4gb
%rwf=crotonophenone.rwf
%nosave
%chk=crotonophenone.chk
%lindaworkers=
#p opt=cartesian b3lyp/3-21g nosymm
Structure optimization 3-methyl-2-cyclopenten-1-one
0 1
 C -4.534810 -0.132847 -0.003819
 C -3.414537 0.893678 -0.013650
 C -2.139283 0.169386 -0.008537
 C -3.820202 -1.496587 0.007301
 H -5.160304 0.007832 -0.876638
 H -5.158770 0.022860 0.867546
 C -2.341859 -1.150612 0.003016
 H -4.071150 -2.101454 -0.858358
 H -4.069611 -2.086443 0.883697
 C -1.304643 -2.225378 0.011365
 H -0.303458 -1.815725 0.006958
 H -1.414552 -2.868650 -0.856502
 H -1.413021 -2.853601 0.890377
 H -1.193705 0.670893 -0.013693
 O -3.569596 2.104036 -0.023940
The job submission script performs the following steps:
1. Creates a GAUSS_SCRDIR scratch directory in the user $SCRATCH directory.
2. Re-writes the %lindaworkers= directive in the Link0 section of the Gaussian input file to contain the
hostnames of the compute nodes assigned by the scheduler.
3. Runs the g16 job, then cleans up the scratch directory.

## Support

```bash
#!/bin/bash
#PBS -q default
#PBS -N crotonophenone
```

## change "mem" and "ncpus" to match the requirements of your job
## suggested: ncpus= 4(small jobs), 8, 12, 16, 20, 24, 28, or 32(LARGE jobs)
## suggested: mem = ncpus*2gb ; should be whatever g16 %mem 1gb
## Request 2 nodes with 4 cores each
```bash
#PBS -l select=2:ncpus=4:mem=5gb -l place=scatter
#PBS -l walltime=04:00:00
```

## Replace `x-ccast-prj-` with your group name
```bash
#PBS -W group_list=x-ccast-prj-
```

## Load the Gaussian module
```bash
module load gaussian/16-c02-avx2
```

## sleep time to prevent multi-node sync issues
sleep 5
## Input and output file names
INPUT=crotonophenone.com
OUTPUT=crotonophenone.log
## Create a scratch directory for the job
```bash
export GAUSS_SCRDIR=$SCRATCH/g16.$PBS_JOBID
mkdir -p $GAUSS_SCRDIR
```

## Change to the directory where the input file is located
```bash
cd $PBS_O_WORKDIR
```

## The following rewrites the input for Linda
if [ -f nodefile.dat ]; then
 rm nodefile.dat
fi
for i in $(uniq $PBS_NODEFILE); do
```bash
 ssh $i "hostname" >> nodefile.dat
done
```

sed -i 's/$/-ib/g' nodefile.dat
```bash
export LINDA=$(cat nodefile.dat | tr -s "\n" "," | sed 's/,$//')
```

sed -i "s/%lindaworkers=/&$LINDA/" $INPUT
## Run the Gaussian job
g16 < $INPUT > $OUTPUT
## Clean up the scratch directory
rm -rf $GAUSS_SCRDIR nodefile.dat
This script is submitted to the queue using the qsub command:
```bash
qsub crotonophenone.pbs
```

Output Files
The output of a Gaussian 16 calculation includes the plaintext .log file, which contains the results of the
calculation, and the binary .chk file, which contains the wavefunction and other data. The .chk file can be
used as input for further calculations, and the .log file can be used to extract the results of the calculation.
[The Gaussian utilities formchk](https://gaussian.com/formchk/) and cubegen
<https://gaussian.com/cubegen/> operate on the chk file to generate formatted checkpoint files and cube
files, respectively.

## FAQ and Troubleshooting

I would like to use a mixed basis setfor my calculation. How do I do that?
Use the gen keyword in the route section, then specify the basis set for each atom in the molecule after the
coordinates and connectivity information, with four asterisks **** to separate the basis sets. For example,
for a Tungsten Ligand:
! link0 section removed for brevity
# opt b3lyp/gen
Tungsten Ligand
0 1
! coordinates and connectivity information removed for brevity
W 0
LANL2DZ
****
C H O N 0
6-31G(d)
****
I would like to use implicit solvation in my calculation. How do I do that?
Use the SCRF keyword in the route section to specify the solvent model and the dielectric constant. For
example, to use the SMD solvation model with water as the solvent:

## Support

! link0 section removed for brevity
# opt b3lyp/6-31G(d) scrf(smd,solvent=water)
My job is not converging.What can I do?
Increase the number of SCF iterations using the MaxCycle=N keyword, where N is the maximum
number of iterations.
Use a tighter convergence criterion using the SCF=QC keyword (more computationally expensive, but
may help in some cases.)
Use a different initial guess using the Guess=Read keyword to read the initial guess from a previous
calculation
Try performing optimizations starting from mechanical (UFF) or semi-empirical (PM3/PM6) initial
geometries.
You can modify your input file, removing the coordinates, and use the Geom=AllCheck keyword to read the
initial geometry from the checkpoint file to restart a non-converged job, if you also wrote a read-write file.
I am getting an error message aboutthe basis set.What does it mean?
Not all basis sets define the electronic properties of all atoms. For example, the 3-21g basis set does not
define the electronic properties of transition metals, while 6-31G only supports H-Kr. If you are using a basis
set that does not define the electronic properties of an atom in your molecule, you will need to use a
different basis set or use a mixed basis set.
I am getting an error message about galloc.What does it mean?
This is a memory allocation error due to lack of memory. Gaussian handles memory in such a way that it
actually uses about 1GB more than the %mem directive. Be sure the PBS declaration for memory is sufficient
for the job, declaring at least 1GB more in your PBS script than in your LINK0 section, especially for Linda
jobs.

## Parallel Scaling Performance

Gaussian16 can be run on multiple cores and nodes using Linda. The performance of Gaussian is
dependent on the number of cores and nodes used, the basis set(s) used, and the model chemistry used.
For the following tests, a C fullerene molecule was geometrically optimized using quadratic convergence
criteria, producing an average time across 5 identical runs.

## Speedup vs.Cores

Efficiencyvs.Cores
Conclusions
60
Support
Based on the results above, we recommend the following for Gaussian 16 jobs on CCAST:
For jobs with larger core counts, request only a single node. Beyond 8 cores per node, scaling
efficiency for multi-node jobs is much lower than for single-node jobs.
For single-node runs, you may request up to the maximum number of cores on a node. Scaling
efficiency for single-node jobs appears to grow approximately linearly out to 128 cores.
If your goal is throughput instead of speed, you may want to choose lower per-job core counts (20-
40 cores per job) in order to process more Gaussian 16 runs simultaneously.
For small core counts (fewer than 8 cores), multi-node scaling efficiency is satisfactory, so Gaussian
16 can be used to leverage small numbers of cores across multiple nodes if these resources are
available; however, this can come at a cost to overall job efficiency.
Keywords:
Gaussian, Quantum Chemistry, Cheminformatics, Computational Chemistry, How-To, Tutorial, CCAST, HPC
Suggest keywords
Doc ID: 135576
Owned by: Stephen S. in NDSU IT Knowledge Base
Created: 2024-02-20
Updated: 2024-08-07
Sites: NDSU IT Knowledge Base
[Helpful 2 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=135576)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=135576)
Support
