# Running Containers on CCAST using Apptainer

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Running Containers on CCAST using Apptainer](https://kb.ndsu.edu/it/128827). Formatting (headings, code blocks, tables, images) needs review before publishing.

Overview and tutorial for using Apptainer, a Linux containerization software, on CCAST: working with image files, installing on a local machine,
and running scripts on CCAST.
Apptainer (formerly Singularity) is an open-source computer program that allows for applications to be
deployed on Linux as containers: these containers are lightweight, stand-alone, and executable packages
for an application, containing everything that the application needs to run. Based on Docker
<https://docker.com> , Apptainer allows for the creation of containers from a simple configuration file called
a definition, or ready-made from an online repository. Apptainer allows for the deployment of reproducible
software packages onto CCAST, allowing users to quickly deploy software locally and utilize features such
as GPU hardware acceleration.
While the full Apptainer user documentation is available here
<https://apptainer.org/docs/user/latest/index.html> , this document is a brief overview of Apptainer and its
use on CCAST.

## Using Apptainer on CCAST

To use Apptainer on CCAST, load the Apptainer module:
module load apptainer
Then use the apptainer command to interact with Apptainer. For example, to see the available commands,
use the apptainer help command:
apptainer help
To see the help for a specific command, use the apptainer help <command> command:
apptainer help pull
Apptainer interacts with containers, which appear on the filesystem as .sif files. Several containers are
available for use at /mmfs1/apps/containers on CCAST.

## Pulling an ApptainerContainer

Pulling an Apptainer container copies a ready-made container from an external, internet-based source. To
pull an Apptainer container, use the apptainer pull command after loading the Apptainer module:
apptainer pull <container>
Here, the can be either a container name or a container name with a tag. For example, to pull the
container ubuntu:latest, use the command:
apptainer pull docker://ubuntu:latest
This creates a local, ready-to-run containerized version of the Ubuntu operating system, named
ubuntu_latest.sif by pulling it from Docker Hub.

## Finding Containers

Many online repositories of containers exist, including:
[Docker Hub](https://hub.docker.com)
[Nvidia GPU Cloud](https://catalog.ngc.nvidia.com)
[BioContainers](https://biocontainers.pro)
[Singularity Hub (archive only)](https://singularity-hub.org)
Running an ApptainerContainer
To run an Apptainer container, use the apptainer exec command:
apptainer exec <container> <command>
This runs the command <command> inside the container <container>. For example, to run the command ls -
l inside the container ubuntu:latest, use the command: Support
apptainer exec ubuntu_latest.sif cat /etc/lsb-release
This runs cat /etc/lsb-release inside the container ubuntu_latest.sif, which prints the version of Ubuntu
inside the container.

## Running an Interactive Shell

To run an interactive shell inside a container, use the apptainer shell command:
apptainer shell <container>
This runs an interactive shell inside the container <container>.

## Creating containers

Apptainer containers can be created from a definition file, which is a simple text file containing
instructions for building the container, including the installation of software. For example, the following
definition file creates a container with the latest version of Ubuntu, then installs the neovim text editor:
Bootstrap: docker
From: ubuntu:latest

%post
apt update
apt install -y neovim

%environment
export EDITOR=nvim
export LC_ALL=C

%runscript
exec nvim "$@"
To build this container, save the above text to a file named neovim.def, then use the apptainer build
command:
apptainer build neovim.sif neovim.def
This creates a container named neovim.sif from the definition file neovim.def, and creates a default action
that can be run for the container. To run the container, use the apptainer run command:
apptainer run neovim.sif
Installing Apptainer on your local machine
Apptainer is available for Linux, MacOS, and Windows. To install Apptainer on your local machine, follow
[the instructions here](https://apptainer.org/docs/admin/latest/installation.html) . In brief:

## Linux

Apptainer is easiest installed via the command line with the following commands, depending on your
distribution:
# Red Hat, Rocky Linux, CentOS, and Fedora
sudo yum install -y epel-release
sudo yum install -y apptainer apptainer-suid
# Ubuntu
sudo apt install -y software-properties-common
sudo add-apt-repository -y ppa:apptainer/ppa
sudo apt update
sudo apt install -y apptainer apptainer-suid
# Debian
sudo apt update
sudo apt install -y wget
wget
https://github.com/apptainer/apptainer/releases/download/v1.4.0/apptainer_1.4.0_amd64.deb
sudo apt install ./apptainer_1.1.8_amd64.deb
# Arch, Manjaro, Artix, and other Arch-based distributions
sudo pacman -S apptainer
Windows orMacOS
While Apptainer is not available for Windows or MacOS, it can be installed in a Linux virtual machine. Many
options are available, but the following have generally good support:

## Windows Subsystem for Linux (WSL) for Windows

UTM for MacOS
VirtualBox for either platform
These allow for a virtual Linux environment to be run from a host machine, into which Apptainer can be
installed as above.

## On CCAST

Apptainer is available on CCAST as a module. To use it, load the module: Support
module load apptainer
Practical Example: PBS scripting and Apptainer
Apptainer containers can be run from within PBS scripts, and thus leverage the power of GPU acceleration
for HPC jobs. The entire workflow of setting up and running can be performed using the CCAST scheduler.
For example, the following PBS script runs a containerized version of the gromacs molecular dynamics
package to perform a simulation of human alcohol dehydrogenase solvated in water, using 4 GPUs on
CCAST:
#!/bin/bash
#PBS -q gpus
#PBS -N gromacs-test
#PBS -l select=1:mem=16GB:ngpus=4:ncpus=8:mpiprocs=4:ompthreads=2
#PBS -l walltime=00:30:00
#PBS -j oe
#PBS -W group_list=<YOUR GROUP HERE>

## Load the apptainer module
module load apptainer
module load wget

## Change to the scratch directory and create a working directory
cd $SCRATCH
mkdir gromacs-test
cd gromacs-test

## Copy the input files to the working directory
wget
https://zenodo.org/record/3893789/files/GROMACS_heterogeneous_parallelization_benchmark_info_and_systems_
JCP.tar.gz
tar -xzf
./GROMACS_heterogeneous_parallelization_benchmark_info_and_systems_JCP.tar.gz
GROMACS_heterogeneous_parallelization_benchmark_info_and_systems_JCP/adh_dodec/ --strip-components=2

## pull the container
apptainer pull docker://nvcr.io/hpc/gromacs:2022.3

## Run the container
SIF=$(pwd)/gromacs_2022.3.sif
APP="apptainer run --nv -B ${PWD}:/host_pwd --pwd /host_pwd ${SIF}"
${APP} gmx grompp -f pme_verlet.mdp
${APP} gmx mdrun -v -nsteps 100000 -resetstep 90000 -noconfout -ntmpi 4 -ntomp
2 -nb gpu -bonded gpu -pme gpu -npme 1 -nstlist 400 -s topol.tpr

## Copy the output files back to the home directory
cd ..
cp -r gromacs-test $HOME

## Clean up
rm -rf gromacs-test
exit 0
Berendsen, H.J.C., van der Spoel, D. and van Drunen, R., GROMACS: A message-passing parallel molecular
dynamics implementation, Comp. Phys. Comm. 91 (1995), 43-56.
Lindahl, E., Hess, B. and van der Spoel, D., GROMACS 3.0: A package for molecular simulation and trajectory
analysis, J. Mol. Mod. 7 (2001) 306-317.
Keywords:
acceleration apptainer ccast containerization cuda docker gpu gpus gromacs hpc how-to installation
instructional linux parallelism prime scientific singularity tutorial
Suggest keywords
Doc ID: 128827
Owned by: Stephen S. in NDSU IT Knowledge Base
Created: 2023-06-06
Updated: 2025-08-21
Support
Sites: NDSU IT Knowledge Base
[Helpful 0 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=128827)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=128827)
Support
