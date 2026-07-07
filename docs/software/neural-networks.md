# Introduction to Neural Networks on CCAST

*A beginner's guide to running TensorFlow and PyTorch jobs on CCAST HPC clusters.*

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Introduction to Neural Networks on CCAST](https://kb.ndsu.edu/it/133762). Formatting (headings, code blocks, tables, images) needs review before publishing.

## Introduction

This document provides instructions on how to run TensorFlow and PyTorch neural network jobs on CCAST
clusters. In the following examples, we will use the CIFAR-10 dataset to train a convolutional neural
network (CNN) to classify images. The CIFAR-10 dataset consists of 60,000 32x32 color images in 10 classes,
with 6,000 images per class. For more information about the CIFAR-10 dataset, see the CIFAR-10 website
<https://www.cs.toronto.edu/~kriz/cifar.html> .

## Neural Networks

As a subset of artificial intelligence, machine learning algorithms improve models automatically through
existing experience. A machine learning algorithm builds mathematical models on training data to make
predictions or decisions after learning from those training data, and is then evaluated on test data. The
goal of machine learning is to generalize a model to make predictions or decisions on new data.
Neural networks are machine learning models which are inspired by the structure and function of the
human brain, composed of a large number of highly interconnected processing elements (neurons)
working in unison to solve specific problems.
In this example, we compose a neural network which uses convolutional layers to extract features from
images, and fully connected layers to classify the images. The following figure shows the structure of the
CNN used in the following examples:
<https://kb.ndsu.edu//images/group406/shared/sequential_model.png>
CNN structure used in the following examples: during forward pass of the network, data flows from left to
right.
In each example, the Python script performs the following steps:
Data Preparation - download and prepare the CIFAR-10 dataset, splitting into training, validation,
and test sets.
The training set (40,000 images) is used to train the model, and is used to update the model
weights.
The validation set (10,000 images) is used to evaluate the model during training.
The test set (10,000 images) is used to evaluate the model after training is complete.
Model Definition - define a CNN model using TensorFlow or PyTorch, and compile the model.
Model Training - train the model using the training set, and evaluate the model accuracy using the
validation set.
Model Testing - finally, test the model accuracy using the test set.

## Python Machine Learning Frameworks

We will use the following machine learning frameworks in this tutorial, both of which are available on
CCAST:
[TensorFlow](https://www.TensorFlow.org/) - an open-source software library for dataflow and
differentiable programming across a range of tasks, developed by Google Brain Team.
[PyTorch](https://pytorch.org/) - an open-source machine learning library, used for applications
such as computer vision and natural language processing, primarily developed by Facebook’s AI
Research lab (FAIR).
Additional python packages can be installed and managed by users using either virtual environments
<[https://docs.python.org/3/library/venv.html> or conda](https://www.anaconda.com/download) . for more
information about creating your own custom machine learning environments, see the related kb article
<https://kb.ndsu.edu/126857#toc4> .

## Neural NetworkWorkflows on CCAST

Support
Example files
All the examples and job submission scripts discussed in this document can be found in the following
[compressed file on Thunder Prime](https://kb.ndsu.edu/128284) :
/mmfs1/projects/ccastest/examples/cnn_example.tar.gz.
[Login](https://kb.ndsu.edu/130346) to Thunder Prime and copy the example file cnn_example.tar.gz to
your SCRATCH directory
$ cp /mmfs1/projects/ccastest/examples/cnn_example.tar.gz $SCRATCH
# change to your SCRATCH directory
$ cd $SCRATCH
# extract the example files
$ tar -xvf cnn_example.tar.gz
$ cd cnn_example
TensorFlow Usage
On CCAST, TensorFlow is available as an anaconda environment. To use TensorFlow, you must first load the
anaconda module and activate the TensorFlow environment. The example files demonstrate basic usage
of TensorFlow on CCAST clusters.
Within the cnn_example directory, the TensorFlow directory contains the following files:
tf_cpu.py - a TensorFlow example script for CPU-based jobs.
tf_gpu.py - a TensorFlow example script for GPU-based jobs.
tf_cpu.pbs - a PBS job script for running the tf_cpu.py script on a single node with 4 CPU cores.
tf_gpu.pbs - a PBS job script for running the tf_gpu.py script on a single node with 4 CPU cores and 1
GPU.

## CPU-basedJobs

For CPU-based jobs, the NCPUS environment variable can be used to specify the number of CPU cores to
use within python. The following example shows how to run a TensorFlow job on a single node with 4 CPU
cores:
#!/bin/bash
#PBS -q default
#PBS -N tf_cpu_test
#PBS -l select=1:mem=16gb:ncpus=4
#PBS -l walltime=08:00:00
## replace "x-ccast-prj-" below with your "x-ccast-prj-[your group name]"
#PBS -W group_list=x-ccast-prj-

cd ${PBS_O_WORKDIR}

## load anaconda TensorFlow environment
source /mmfs1/apps/pyenvs/anaconda3-2022.05/bin/activate tf-2.10

python tf_cpu.py
To submit the job, use the qsub command:
$ qsub tf_cpu.pbs
GPU acceleratedJobs
To run TensorFlow jobs on GPU nodes, you must first load the cuda and cudnn modules, and activate the
TensorFlow environment. The following example shows how to run a TensorFlow job on a single node with
4 CPU cores and 1 GPU.
#!/bin/bash
#PBS -q gpus
#PBS -N tf_gpu_test
#PBS -l select=1:mem=16gb:ncpus=4:ngpus=1
#PBS -l walltime=08:00:00
## replace "x-ccast-prj-" below with your "x-ccast-prj-[your group name]"
#PBS -W group_list=x-ccast-prj-

cd ${PBS_O_WORKDIR}

## load cuda and cudnn modules
module load cuda/12.3
module load cudnn/8.9

## load anaconda TensorFlow environment
source /mmfs1/apps/pyenvs/anaconda3-2022.05/bin/activate tf-2.10

python tf_gpu.py
To submit the job, use the qsub command:
$ qsub tf_gpu.pbs
Support
PyTorch Usage
Pytorch automatically detects and uses both GPU and CPU resources. The example files demonstate basic
usage of PyTorch on CCAST clusters. Within the cnn_example directory, the pytorch directory contains the
following files:
pytorch.py - a PyTorch example script.
pytorch_cpu.pbs - a PBS job script for running the pytorch.py script on a single node with 4 CPU
cores.
pytorch_gpu.pbs - a PBS job script for running the pytorch.py script on a single node with 4 CPU
cores and 1 GPU.

## CPU-basedJobs

On CCAST, PyTorch is available as an anaconda environment. To use PyTorch, you must first load the
anaconda module and activate the PyTorch environment. The following example shows how to run a
PyTorch job on a single node with 4 CPU cores:
#!/bin/bash
#PBS -q default
#PBS -N pytorch_cpu_test
#PBS -l select=1:mem=16gb:ncpus=4
#PBS -l walltime=08:00:00
## replace "x-ccast-prj-" below with your "x-ccast-prj-[your group name]"
#PBS -W group_list=x-ccast-prj-

cd ${PBS_O_WORKDIR}

## load anaconda PyTorch environment
source /mmfs1/apps/pyenvs/anaconda3-2022.05/bin/activate pytorch

python pytorch.py
To submit the job, use the qsub command:
$ qsub pytorch_cpu.pbs
GPU acceleratedJobs
To run PyTorch jobs on GPU nodes, you must first load the cuda and cudnn modules, and activate the
PyTorch environment. The following example shows how to run a PyTorch job on a single node with 4 CPU
cores and 1 GPU.
#!/bin/bash
#PBS -q gpus
#PBS -N pytorch_gpu_test
#PBS -l select=1:mem=16gb:ncpus=4:ngpus=1
#PBS -l walltime=08:00:00
## replace "x-ccast-prj-" below with your "x-ccast-prj-[your group name]"
#PBS -W group_list=x-ccast-prj-

cd ${PBS_O_WORKDIR}

## load cuda and cudnn modules
module load cuda/12.3
module load cudnn/8.9

## load anaconda PyTorch environment
source /mmfs1/apps/pyenvs/anaconda3-2022.05/bin/activate pytorch

python pytorch.py
To submit the job, use the qsub command:
$ qsub pytorch_gpu.pbs
Performance
Benchmarking was performed on a single node, with all times taken as the mean of 10 runs. The following
tables show the results of the example scripts on a single node.

## TensorFlow

Job Type Cores GPU Mean Training Time (s) Speedup*
CPU 1 - 4927 1.00
CPU 4 - 1745 2.82
CPU 6 - 1391 3.54
CPU 8 - 821.2 6.00
CPU 16 - 504.5 9.77
CPU 32 - 354.8 13.8
CPU 64 - 473.0 10.4
GPU 4 1x a10 26.45 186
GPU 4 1x a40 23.27 212
Support
Job Type Cores GPU Mean Training Time (s) Speedup*
GPU 4 1x a100 19.75 249
PyTorch
Job Type Cores GPU Mean Training Time (s) Speedup*
CPU 1 - 2835 1.00
CPU 4 - 822.3 3.44
CPU 6 - 582.5 4.87
CPU 8 - 504.4 5.62
CPU 16 - 300.9 9.42
CPU 32 - 238.6 11.9
CPU 64 - 356.2 7.96
GPU 4 1x a10 56.6 50.1
GPU 4 1x a40 49.2 57.7
GPU 4 1x a100 47.2 60.1
*Note: Values for speedup are calculated within a single framework, with reference to the single core CPU
runtime, and should not be directly compared across frameworks.

## Multi-node Jobs

The parallelization of deep learning jobs across multiple nodes is not trivial, and requires the creation of
specific python code for each framework. The following links provide examples of multi-node jobs for
TensorFlow and PyTorch:
[TensorFlow Distribute Strategy](https://www.tensorflow.org/api_docs/python/tf/distribute/Strategy)
[PyTorch Distributed Data Parallel](https://pytorch.org/tutorials/intermediate/ddp_tutorial.html)
Keywords:
How-to, Tutorial, CCAST, HPC, Machine Learning, Deep Learning, Neural Networks, Computer Science, Python,
Pytorch, TensorFlow, Statistics
Suggest keywords
Doc ID: 133762
Owned by: Stephen S. in NDSU IT Knowledge Base
Created: 2023-12-29
Updated: 2024-05-29
Sites: NDSU IT Knowledge Base
[Helpful 0 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=133762)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=133762)
Support
