# Highlights - Computational Fluid Modeling of Floods

*Principal Investigator: Trung Bao Le (Civil and Environmental Engineering, North Dakota State University)*

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Highlights - Computational Fluid Modeling of Floods](https://kb.ndsu.edu/it/109479). Formatting (headings, code blocks, tables, images) needs review before publishing.

Dr. Le’s research involves computational method and code development to solve fluid flow problems in environmental applications. The goal is
to develop highly scalable and efficient flow solvers for the next generation of exascale computing systems
<https://en.wikipedia.org/wiki/Exascale_computing> to study fluid flows over complex geometries and moving boundaries under turbulent
condition.
[The Computational Fluids Laboratory](https://sites.google.com/view/complexfluidlab/home?authuser=1)  led by Dr. Le currently focuses on river
flows, specifically Spring floods which usually cause serious damage to communities and infrastructure in the Midwest. This problem requires
resolving 3D flow structures with large disparities of temporal and spatial scales over irregular domains.
His research group has contributed to multiple NSF, DOE, and NIH-funded projects on developing high-performance computing (HPC) codes,
including Virtual Flow Simulator (VFS) which is capable of simulating multi-physics/multi-phase flows with advanced turbulence models over
complex terrains. These codes have been tested and ran [on HPC clusters at CCAST](https://www.ndsu.edu/ccast) and national computing
facilities such as [the Argonne Leadership Computing Facility](https://www.alcf.anl.gov/) and the Pittsburgh Supercomputing Center
<https://www.psc.edu/> .

## Understanding Spring floods in North Dakota

Major cities of North Dakota have suffered great losses in the last few decades from Red River floods. Understanding the hydrological
mechanism of Spring floods, especially under these extreme events could potentially contribute to the new development of flood monitoring
and mitigation strategies. Dr. Le’s Lab is developing methods that use remote-sensing data and HPC techniques to simulate flow dynamics in
rivers under open-surface and ice-covered conditions; see Fig. 1. Fargo, North Dakota, is a pilot site for collecting field measurement data which
is then used to validate and verify the computational model before applying it to other rivers.
Figure 1: Flows in the Red River of the North in Fargo, North Dakota, under two regimes in winter 2019: (a) open-surface and (b) ice-covered
conditions.
Figure 2: Preliminary data of the Red River hydraulics: (a) assembled LiDAR data, (b) 3D model of the city of Fargo reconstructed from the
Digital Terrain Model (DTM), (c) deployment of ADCP across one cross-section, (d) utilization of accessible bridges in downtown Fargo, and (e)
high-velocity region was found on the outer bank of the Red River due to river meandering.
An example of the work carried out by Dr. Le’s Lab is shown in Fig. 2. The topographic data of the downtown Fargo area was surveyed by the
North Dakota Water Commission. From the original data, the Light Detection and Ranging (LiDAR) data were assembled using ArcGIS and
further processed to show details of the floodplain including highways, streets, and large building blocks; see Fig. 2(a). Other, smaller details of
man-made structures such as floodwalls, ditches, and small channels, were also visible as seen in Fig. 2(b). Since the LiDAR data was
constrained within the dry-land area, the bathymetry of the riverbed was not available. His group carried out expeditions to measure the
bathymetry and flow distribution of the Red River reach in downtown Fargo; see Figs. 2(c) and 2(d). An Acoustic Doppler Current Profiler
(ADCP) was used to measure stream data in Lindenwood Park; the flow velocities are shown in Fig. 2(e). Their results showed a complex flow
distribution among cross-sections resulting from the meandering characteristics of the Red River.
Figure 3: Flow velocity distribution on the surface in one of the bends.
Flow dynamics during spring is not well understood, especially with the presence of ice. In their study, three-dimensional flow structures are
analyzed in a river bend during winter to understand the linkage between ice coverage and velocity profile distribution. A river reach of the Red
River is selected as the study site. Large-eddy simulations (LES) are carried out on CCAST’s supercomputer and results are shown in Fig. 3. This
is a massive amount of data containing a total of 100 million grid points resolving very detailed flow at every 4 meters. They compare the
simulation result and field measurement data to examine how good the simulation is. The river bend affects how flow velocity is distributed
due to the impact of bank curvature. Since the field measurement can only provide flow conditions at a limited number of locations, the high7/7/26, 10:27 AM Highlights - Computational Fluid Modeling of Floods
fidelity simulation has the advantage of covering the entire river reach in downtown Fargo. Such details of flow distribution are important for
planning of flood fight as well as for developing new mitigation measures in the case of historical flooding. This type of simulation is highly
valuable for the city of Fargo in urban planning as well as risk management.

## References

[1] T. B. Le, A. Khosronejad, F. Sotiropoulos, N. Bartelt, S. Woldeamlak, and P. Dewall, “Large-eddy simulation of the Mississippi River under base-flow
condition: hydrodynamics of a natural diffluence-confluence region,” Journal of Hydraulic Research 57, 836 (2019).
[2] A. Khosronejad, T. Le, P. DeWall, N. Bartelt, S. Woldeamlak, X. Yang, and F. Sotiropoulos, “High-fidelity numerical modeling of the Upper
Mississippi River under extreme flood condition,” Advances in Water Resources 98, 97 (2016).

## See Also

Center for [Computationally Assisted Science and Technology](https://kb.ndsu.edu/page.php?id=104188)
Keywords:
ndsu ccast hpc research highlights
Suggest keywords
Doc ID: 109479
Owned by: Khang H. in NDSU IT Knowledge Base
Created: 2021-03-02
Updated: 2026-06-23
Sites: NDSU IT Knowledge Base
[Helpful 1 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=109479)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=109479)
